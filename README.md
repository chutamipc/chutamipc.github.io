# chutamipc.github.io

Página de **Chuta, Mi PC!**: soporte técnico de PCs y laptops en Cuenca, Ecuador.

Sitio: https://chutamipc.github.io

## Cómo está hecha

- Un solo archivo, `index.html`, con el HTML, el CSS y el JS adentro. Sin frameworks ni build.
- Las imágenes están en `img/`.
- Se publica sola con GitHub Pages desde la rama `main`.

## Cambios frecuentes

Todo se edita en `index.html`:

| Qué | Dónde |
|---|---|
| Número de WhatsApp | Al final del archivo, en la línea `var WHATSAPP = "WHATSAPP_NUMERO";`. Va en formato internacional sin `+` (ejemplo: `593991234567`). Es el único lugar que hay que tocar. |
| Enlace de Facebook | Justo debajo, en `var FACEBOOK = "";`. Mientras esté vacío, el pie muestra el nombre de la página sin enlace. |
| Precios y textos | Busca el nombre del paquete (por ejemplo `Chuta Express`) y edita su tarjeta. |
| Mensaje que se abre en WhatsApp | El atributo `data-wa` de cada botón. |

## Imágenes

| Archivo | Uso |
|---|---|
| `img/Chuta_Logo_1080.png` y `img/Chuta_Icono_Perfil.png` | Logo y mascota originales. |
| `img/Chuta_Logo_720.webp` y `img/Chuta_Logo_1080.webp` | Logo liviano que se muestra en el inicio. |
| `img/Chuta_Icono_Perfil_128.webp` y `img/Chuta_Icono_Perfil_480.webp` | Mascota de la cabecera, el pie y el cierre. |
| `img/Chuta_OG_1200x630.jpg` | Imagen que aparece al compartir el enlace. |
| `favicon.ico`, `img/favicon-*.png` y `img/apple-touch-icon.png` | Ícono de la pestaña. |

Las versiones `.webp` tienen el fondo del mismo azul que la página (`--azul-logo` en el CSS) para que no se note el recuadro de la imagen. Si se cambia el logo, hay que volver a generarlas.
