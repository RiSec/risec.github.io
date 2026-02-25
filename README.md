# RIST Remix (mock)

## Setup

```bash
npm install
npm run dev
```

## Notes
- HOMEのスクロールバーは、一番上では非表示にし、80〜90px以上スクロールすると表示されます。
- ホリゾンタルバーとコンソールはスクロール量で段階的に出現します (requestAnimationFrame + scrollYの軽量実装)
- 一度最下部(CONTACT)を見ると、localStorageでフラグを保存し、次回以降の表示が少し変わります。
