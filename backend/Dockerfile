# 1. NodeとPHPを一時的に使えるビルドステージ
FROM node:18 AS frontend-builder

WORKDIR /app
COPY ../frontend/package.json ../frontend/package-lock.json* ./
RUN npm install

COPY ../frontend ./
RUN npm run build


# 2. PHP + Apache 本番環境
FROM php:8.2-apache

# PHP拡張とApache設定
RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# 作業ディレクトリ
WORKDIR /var/www/html

# Reactのビルド結果をコピー（静的ファイル）
# COPY --from=frontend-builder /app/dist/ /var/www/html/

# PHPファイルを配置
COPY ./public/ /var/www/html/

# パーミッション設定
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html
