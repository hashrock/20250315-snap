# Snap Canvas - インタラクティブな図形エディタ

Vue 3 + TypeScript + Viteで構築された、ドラッグ&ドロップ対応の図形エディタです。図形を移動する際に、他の図形にスナップする機能を備えています。

## 機能

- 🎨 SVGベースの図形描画
- 🔄 ドラッグ&ドロップによる図形の移動
- 🧲 X軸・Y軸の自動スナップ機能
- 📐 矩形と円形のサポート
- ✨ リアルタイムのスナップガイドライン表示

## 技術スタック

- **フレームワーク**: Vue 3 (Composition API + `<script setup>`)
- **言語**: TypeScript
- **ビルドツール**: Vite
- **パッケージマネージャー**: pnpm

## セットアップ

### 必要な環境

- Node.js 20以上
- pnpm 8以上

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/[username]/20250315-snap.git
cd 20250315-snap

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

## 開発

```bash
# 開発サーバーの起動 (http://localhost:5173)
pnpm dev

# プロダクションビルド
pnpm build

# ビルドのプレビュー
pnpm preview
```

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用して自動的にGitHub Pagesにデプロイされます。

### デプロイの設定手順

1. **GitHubリポジトリの設定**
   - リポジトリの Settings > Pages に移動
   - Source を「GitHub Actions」に設定

2. **自動デプロイ**
   - `main`ブランチにプッシュすると自動的にデプロイが開始されます
   - GitHub Actionsのワークフローは `.github/workflows/deploy.yml` に定義されています

3. **手動デプロイ**
   - GitHubリポジトリの Actions タブから手動でワークフローを実行することも可能です

### デプロイURL

デプロイ後、以下のURLでアクセスできます：
```
https://[username].github.io/20250315-snap/
```

## プロジェクト構成

```
src/
├── App.vue                 # メインアプリケーションコンポーネント
├── components/
│   ├── ShapesCanvas.vue    # キャンバスコンポーネント
│   ├── ShapeEl.vue         # 個別図形コンポーネント
│   ├── CircleEl.vue        # 円形要素
│   ├── RectEl.vue          # 矩形要素
│   ├── shapes.ts           # サンプル図形データ
│   └── utils.ts            # スナップ計算ユーティリティ
├── types.ts                # TypeScript型定義
└── main.ts                 # エントリーポイント
```

## 使い方

1. キャンバス上に配置された図形をクリックして選択
2. ドラッグして図形を移動
3. 他の図形の端に近づくと自動的にスナップ
4. スナップガイドラインが表示され、整列を確認できます

## ライセンス

MIT