install:
	pnpm install

build:
	pnpm esbuild --bundle apps/functions/src/*.handler.ts --outdir=apps/functions/dist --target=es2020,node16