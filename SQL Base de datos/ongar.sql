-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-11-2025 a las 13:49:14
-- Versión del servidor: 8.3.0
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ongar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

DROP TABLE IF EXISTS `administradores`;
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gestionar_contenido` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario_id`, `username`, `password_hash`, `gestionar_contenido`) VALUES
(15, 1, 'esteban', '$2b$10$AEnxqLDMsko1yVQpEUxCt.H4xX4gdMUpltsJcKN6v9coeGO7I8ngu', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

DROP TABLE IF EXISTS `animales`;
CREATE TABLE IF NOT EXISTS `animales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `edad_aproximada` varchar(50) NOT NULL,
  `tamaño` varchar(50) NOT NULL,
  `estado_salud` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `foto` varchar(255) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `adoptado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `animales`
--

INSERT INTO `animales` (`id`, `nombre`, `sexo`, `edad_aproximada`, `tamaño`, `estado_salud`, `descripcion`, `foto`, `fecha_ingreso`, `adoptado`) VALUES
(1, 'chicho', 'Masculino', '2', 'chico', 'El perro esta en buen estado de salud, ya fue vacunado y desparasitado.', 'Es un perrito muy cariñoso, de raza pequeña y color negro', './imagenes/chicho2025.png', '2025-11-17', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donaciones`
--

DROP TABLE IF EXISTS `donaciones`;
CREATE TABLE IF NOT EXISTS `donaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donante_nombre` varchar(150) NOT NULL,
  `monto` float NOT NULL,
  `fecha` timestamp NOT NULL,
  `referencia_pago` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias`
--

DROP TABLE IF EXISTS `historias`;
CREATE TABLE IF NOT EXISTS `historias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `imagenes` json NOT NULL,
  `fecha_publicacion` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

DROP TABLE IF EXISTS `noticias`;
CREATE TABLE IF NOT EXISTS `noticias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `techa_publicacion` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes_adopcion`
--

DROP TABLE IF EXISTS `solicitudes_adopcion`;
CREATE TABLE IF NOT EXISTS `solicitudes_adopcion` (
  `id_adopcion` int NOT NULL AUTO_INCREMENT,
  `id_animal` int NOT NULL,
  `solicitante_id` int NOT NULL,
  `nombre_solicitante` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contacto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `experiencia_mascotas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estado` varchar(20) NOT NULL,
  `fecha_envio` timestamp NOT NULL,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_adopcion`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
