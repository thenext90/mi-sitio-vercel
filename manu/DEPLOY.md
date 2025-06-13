# 🚀 Guía Rápida de Despliegue en Vercel

## Pasos Esenciales

### 1. Configurar API Key
```javascript
// En script.js, línea 2:
const API_KEY = 'tu_api_key_de_newsapi_aqui';
```

### 2. Obtener API Key
- Ve a: https://newsapi.org/register
- Regístrate gratis
- Copia tu API key

### 3. Desplegar en Vercel

#### Opción A: Con GitHub (Recomendado)
1. Sube el proyecto a GitHub
2. Ve a https://vercel.com
3. Conecta tu repositorio
4. ¡Deploy automático!

#### Opción B: Drag & Drop
1. Ve a https://vercel.com
2. Arrastra la carpeta del proyecto
3. ¡Listo!

## ✅ Checklist Pre-Despliegue

- [ ] API key configurada en script.js
- [ ] Probado localmente (abre index.html)
- [ ] Todos los archivos incluidos:
  - [ ] index.html
  - [ ] styles.css
  - [ ] script.js
  - [ ] README.md
  - [ ] package.json
  - [ ] vercel.json

## 🔗 URLs Importantes

- **NewsAPI**: https://newsapi.org
- **Vercel**: https://vercel.com
- **Documentación**: Ver README.md completo

## 🆘 Problemas Comunes

**No carga noticias**: Verifica tu API key
**Error CORS**: Normal en desarrollo, se resuelve en producción
**Límite excedido**: Plan gratuito = 1,000 requests/mes

---
¡Tu aplicación estará lista en menos de 5 minutos! 🎉

