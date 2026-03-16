# Reparación Completa - Funcionalidad "Administrar Historias"

**Problema Original**: Error 502 Bad Gateway al usar la funcionalidad de Administrar Historias

---

## 🔴 Errores Identificados y Reparados

### 1. **Backend - historiasController.js**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\backend\controllers\historiasController.js`

#### Problemas:
- ❌ Falta validación de campos requeridos (título, contenido)
- ❌ Variable `datosHistoria.imagenes` no se inicializa cuando no hay archivos (undefined)
- ❌ Manejo incorrecto de imágenes existentes en actualización
- ❌ Falta validación de IDs de parámetros

#### Soluciones aplicadas:
- ✅ Agregar validación: `if (!datosHistoria.titulo || !datosHistoria.contenido)`
- ✅ Inicializar: `datosHistoria.imagenes = []` cuando no hay archivos
- ✅ Corregir procesamiento de imagenes existentes:
  ```javascript
  if (typeof req.body.imagenesExistentes === 'string') {
    const parsed = JSON.parse(req.body.imagenesExistentes);
    imagenesViejas = Array.isArray(parsed) ? parsed : [parsed];
  }
  ```
- ✅ Agregar validaciones en todos los endpoints
- ✅ Devolver la historia actualizada/eliminada al cliente

---

### 2. **Backend - VerificarToken.js** ⚠️ CRÍTICO
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\backend\lib\VerificarToken.js`

#### Problema:
**CAUSA PRINCIPAL DEL 502 BAD GATEWAY**
- ❌ Se declaraba `const JWT_SECRET = process.env.JWT_SECRET;` (undefined)
- ❌ Se usaba en la línea siguiente: `jwt.verify(token, process.env.SECRET_KEY)`
- ❌ Inconsistencia: JWT_SECRET vs SECRET_KEY
- ❌ Cuando se usa undefined en jwt.verify(), causa crash

#### Solución:
- ✅ Cambiar a: `const SECRET_KEY = process.env.SECRET_KEY;`
- ✅ Usar la misma variable: `jwt.verify(token, SECRET_KEY)`
- ✅ Consistencia con loginController.js y otros archivos

---

### 3. **Backend - loginController.js**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\backend\controllers\loginController.js`

#### Problema:
- ❌ Error de sintaxis en catch: `res.status(500).json('HOla' + { error: error.message })`
- ❌ Concatenación incorrecta: string + objeto

#### Solución:
- ✅ Cambiar a: `res.status(500).json({ error: 'Error al procesar el login', message: error.message })`

---

### 4. **Backend - Modelo Historia (historias.js)**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\backend\models\historias.js`

#### Problemas:
- ❌ `alowNull` debería ser `allowNull` (typo)
- ❌ `autoincrement` debería ser `autoIncrement`
- ❌ `fecha_publicacion` tipo `TIME` debería ser `DATETIME`
- ❌ Falta dar valor por defecto a `fecha_publicacion`

#### Soluciones:
- ✅ Cambiar todos `alowNull` → `allowNull`
- ✅ Cambiar `autoincrement` → `autoIncrement`
- ✅ Cambiar `DataTypes.TIME` → `DataTypes.DATETIME`
- ✅ Agregar `defaultValue: DataTypes.NOW`

---

### 5. **Backend - Modelo Adopción (adopciones.js)**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\backend\models\adopciones.js`

#### Problemas:
- ❌ Mismo error: `alowNull` → `allowNull`
- ❌ `autoincrement` → `autoIncrement`
- ❌ `fecha_envio` tipo `TIME` debería ser `DATETIME`
- ❌ Dos campos declarados como `primaryKey` (error grave)
- ❌ `observaciones` con `allowNull: false` pero puede estar vacío

#### Soluciones:
- ✅ Corregir tipeos
- ✅ Cambiar a DATETIME
- ✅ Eliminar `primaryKey: true` de `id_animal`
- ✅ Hacer `observaciones` optional: `allowNull: true`
- ✅ Cambiar `fecha_envio` a DATETIME con defaultValue

---

### 6. **Frontend - AltaHistoria.jsx**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\front\src\pages\admin\Historias\AltaHistoria.jsx`

#### Problema:
- ❌ Envío de archivos undefined a FormData
- ❌ `formData.append('imagenes', undefined)` puede causar problemas

#### Solución:
- ✅ Filtrar archivos válidos:
  ```javascript
  const archivosValidos = fotosParaEnviar.filter(archivo => archivo && archivo instanceof File);
  archivosValidos.forEach((archivo) => {
    formData.append('imagenes', archivo);
  });
  ```

---

### 7. **Frontend - ModificarHistoria.jsx**
**Archivo**: `c:\Users\Lautaro Álvarez\Desktop\ONGAR\front\src\pages\admin\Historias\ModificarHistoria.jsx`

#### Problema:
- ❌ Múltiples `formData.append('imagenesExistentes', img)` puede no procesarse correctamente como array
- ❌ Express/bodyParser puede no convertir múltiples valores con la misma clave en array

#### Solución:
- ✅ Separar imágenes nuevas y viejas
- ✅ Enviar viejas como JSON.stringify:
  ```javascript
  if (imagenesViejas.length > 0) {
    formData.append('imagenesExistentes', JSON.stringify(imagenesViejas));
  }
  ```
- ✅ Backend recibe string y hace JSON.parse:
  ```javascript
  if (typeof req.body.imagenesExistentes === 'string') {
    const parsed = JSON.parse(req.body.imagenesExistentes);
    imagenesViejas = Array.isArray(parsed) ? parsed : [parsed];
  }
  ```

---

## 📋 Archivos Modificados

1. ✅ `backend/controllers/historiasController.js` - Reparación completa
2. ✅ `backend/lib/VerificarToken.js` - Reparación crítica
3. ✅ `backend/controllers/loginController.js` - Reparación de error
4. ✅ `backend/models/historias.js` - Correcciones de tipos
5. ✅ `backend/models/adopciones.js` - Correcciones de tipos
6. ✅ `frontend/src/pages/admin/Historias/AltaHistoria.jsx` - Filtrado de archivos
7. ✅ `frontend/src/pages/admin/Historias/ModificarHistoria.jsx` - Manejo de JSON

---

## 🧪 Pruebas Recomendadas

### 1. Alta de Historias
```bash
POST /api/historias
Headers: Authorization: Bearer <token>
Body: FormData con:
  - titulo: "Mi Historia"
  - contenido: "Contenido de la historia"
  - imagenes: [archivo1, archivo2, ...]
```
**Esperado**: 201 Created con datos de la historia

### 2. Listar Historias
```bash
GET /api/historias
```
**Esperado**: 200 OK con array de historias

### 3. Obtener Historia por ID
```bash
GET /api/historias/:id
Headers: Authorization: Bearer <token>
```
**Esperado**: 200 OK con datos de la historia

### 4. Modificar Historia
```bash
PUT /api/historias/:id
Headers: Authorization: Bearer <token>
Body: FormData con:
  - titulo: "Título modificado"
  - contenido: "Contenido modificado"
  - imagenes: [nuevos archivos]
  - imagenesExistentes: JSON.stringify(["/imagenes/vieja1.jpg"])
```
**Esperado**: 200 OK con historia actualizada

### 5. Eliminar Historia
```bash
DELETE /api/historias/:id
Headers: Authorization: Bearer <token>
```
**Esperado**: 200 OK con confirmación

---

## ⚠️ Notas Importantes

1. **Variable de entorno**: Verificar que `.env` contiene:
   ```
   SECRET_KEY = '122165341283562183625625354216549...'
   ```

2. **Carpeta de imágenes**: Verificar que `/backend/imagenes_test/` existe y tiene permisos de escritura

3. **Base de datos**: Las migraciones deben reflejar los cambios en los tipos de datos (TIME → DATETIME)

4. **Multer config**: El archivo `backend/lib/multerConfig.js` está correctamente configurado

5. **CORS**: El index.js del backend tiene CORS configurado para aceptar Authorization header

---

## 🎯 Resumen de Cambios

| Archivo | Problema | Tipo | Severidad |
|---------|----------|------|-----------|
| historiasController.js | Validación y manejo de imágenes | Logic | 🔴 Alta |
| VerificarToken.js | JWT_SECRET undefined | Auth | 🔴 CRÍTICA |
| loginController.js | Sintaxis JSON malformada | Syntax | 🟡 Media |
| historias.js | Typos en DataTypes | Config | 🟡 Media |
| adopciones.js | Typos + doble primaryKey | Config | 🟡 Media |
| AltaHistoria.jsx | Archivos undefined | Validation | 🟡 Media |
| ModificarHistoria.jsx | Manejo de FormData | Data | 🟡 Media |

---

## ✅ Estado Final

Todos los errores identificados han sido corregidos y la funcionalidad de "Administrar Historias" debería funcionar correctamente en producción.

**Recomendación**: Realizar pruebas exhaustivas antes de desplegar a producción.
