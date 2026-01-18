# 1. Use PHP 8.2 with Apache as the base image
FROM php:8.2-apache

# 2. Install system dependencies (Linux libraries)
# Added pdo_mysql here so you can connect to your Railway MySQL database
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

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

# --- NUCLEAR FIX FOR APACHE CRASH ---
# This removes the conflicting modules so only 'prefork' runs.
RUN rm -f /etc/apache2/mods-enabled/mpm_event.load \
    && rm -f /etc/apache2/mods-enabled/mpm_event.conf \
    && rm -f /etc/apache2/mods-enabled/mpm_worker.load \
    && rm -f /etc/apache2/mods-enabled/mpm_worker.conf \
    && a2enmod mpm_prefork

# 11. Configure Apache DocumentRoot to point to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 12. USE DEFAULT PORT 80
# We removed the 'sed' command that was breaking the port.
EXPOSE 80
