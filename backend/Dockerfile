FROM php:8.2-apache

# 必要なPHP拡張機能をインストール
RUN docker-php-ext-install pdo pdo_mysql

# mod_rewriteを有効化
RUN a2enmod rewrite

# Apacheの設定を調整してAllowOverrideをAllに設定
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# ワーキングディレクトリ設定
WORKDIR /var/www/html

# パーミッションを設定
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html
