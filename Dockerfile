# 1. Use PHP 8.2 with Apache as the base image
FROM php:8.2-apache

# 2. Install system dependencies (Linux libraries)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Install Node.js (Required for Shadcn/Inertia build)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 4. Install Composer (PHP Dependency Manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Set working directory
WORKDIR /var/www/html

# 6. Copy project files
COPY . .

# 7. Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# 8. Install JS dependencies & Build Assets (Vite)
RUN npm install && npm run build

# 9. Set permissions for Laravel storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 10. Enable Apache mod_rewrite for Laravel routes
RUN a2enmod rewrite

RUN a2dismod mpm_event mpm_worker && a2enmod mpm_prefork

# 11. Configure Apache DocumentRoot to point to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 12. Use the default production port
EXPOSE 8080
