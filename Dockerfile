# 1. Use PHP 8.2 with Apache as the base image
FROM php:8.2-apache

# 2. Install system dependencies (Linux libraries)
# Added pdo_mysql here para makaconnect ka sa Railway Database mo
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
# Ito yung fix para hindi mag-crash ang Apache (More than one MPM loaded error)
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
# Tinanggal na natin yung "sed" command na nakakasira.
# Port 80 ang default ng Apache, at ito ang hahanapin ni Railway.
EXPOSE 80
