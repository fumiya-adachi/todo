# コンテナ起動
up:
	docker compose up -d

# コンテナ停止
down:
	docker compose down

# コンテナ再起動
restart:
	docker compose down
	docker compose up -d

# ログ確認
logs:
	docker compose logs -f

# nextコンテナに入る
shell:
	docker compose exec next sh

# 依存インストール
install:
	docker compose run --rm next npm install

# パッケージ追加
add:
	docker compose run --rm next npm install $(pkg)

# dev依存追加
add-dev:
	docker compose run --rm next npm install -D $(pkg)

# prisma generate
prisma-generate:
	docker compose run --rm next npx prisma generate

# prisma migrate
migrate:
	docker compose run --rm next npx prisma migrate dev

# prisma studio
studio:
	docker compose run --rm next npx prisma studio

# DBリセット
db-reset:
	docker compose run --rm next npx prisma migrate reset

# docker rebuild
build:
	docker compose build

# docker rebuild (キャッシュなし)
rebuild:
	docker compose build --no-cache

# docker 状態確認
ps:
	docker compose ps