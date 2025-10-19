
# Humitek Site (Next.js + Tailwind)

## Démarrage en local
1. Installer Node.js LTS (https://nodejs.org/)
2. Ouvrir un terminal dans ce dossier et exécuter :
```bash
npm install
npm run dev
```
3. Ouvrir http://localhost:3000

## Déploiement (Vercel)
- Créer un compte sur https://vercel.com
- Importer ce projet (Upload depuis .zip ou GitHub)
- Vercel détecte automatiquement Next.js et Tailwind.
- Une URL sera créée, ex: https://humitek.vercel.app

## Connecter le domaine humitek.fr
Dans Vercel: Settings > Domains > Add > `humitek.fr`

### DNS (chez votre registrar)
- **Apex (humitek.fr)** : A record -> `76.76.21.21`
- **www.humitek.fr** : CNAME -> `cname.vercel-dns.com.`

Attendre la propagation DNS (souvent < 1h).
