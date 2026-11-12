# chutamipc.github.io

Página de **Chuta, Mi PC!**: soporte técnico de PCs y laptops en Cuenca, Ecuador.

Sitio: https://chutamipc.github.io

## Cómo está hecha

- Un solo archivo, `index.html`, con el HTML, el CSS y el JS adentro. Sin frameworks ni build.
- Las imágenes están en `img/`.
- Se publica sola con GitHub Pages desde la rama `main`.

## Cambios frecuentes

Todo se edita en `index.html`.

**WhatsApp y redes sociales:** al final del archivo hay un bloque marcado `CAMBIAR AQUI`. Es el único lugar que hay que tocar:

| Línea | Qué poner |
|---|---|
| `var WHATSAPP = "593962529610";` | El número en formato internacional sin `+`. Si se deja vacío, los botones de WhatsApp llevan a la sección de contacto. |
| `var INSTAGRAM = "...";` | El enlace del perfil, o solo el usuario (`@usuario`). |
| `var TIKTOK = "...";` | Igual que Instagram. |
| `var FACEBOOK = "";` | El enlace de la página. Mientras esté vacío, Facebook no aparece en el pie. |

**Precios y textos:** busca el nombre del paquete (por ejemplo `Chuta Express`) y edita su tarjeta.

**Mensaje que se abre en WhatsApp:** es el atributo `data-wa` de cada botón.

## Imágenes

| Archivo | Uso |
|---|---|
| `img/Chuta_Logo_1080.png` y `img/Chuta_Icono_Perfil.png` | Logo y mascota originales. |
| `img/Chuta_Logo_720.webp` y `img/Chuta_Logo_1080.webp` | Logo liviano que se muestra en el inicio. |
| `img/Chuta_Icono_Perfil_128.webp` y `img/Chuta_Icono_Perfil_480.webp` | Mascota de la cabecera, el pie y el cierre. |
| `img/Chuta_OG_1200x630.jpg` | Imagen que aparece al compartir el enlace. |
| `favicon.ico`, `img/favicon-*.png` y `img/apple-touch-icon.png` | Ícono de la pestaña. |

Las versiones `.webp` tienen el fondo del mismo azul que la página (`--azul-logo` en el CSS) para que no se note el recuadro de la imagen. Si se cambia el logo, hay que volver a generarlas.
