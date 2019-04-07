# Ejercicio

Introducción

Este proyecto es la solución propuesta para la prueba técnica. La prueba constaba de 2 problemas y una sección de preguntas adcionales.
Para desplegarlo en abmiente local no hay muchas consideraciones, basta con instalar las dependencias necesarias y ejecutar el comando de inicio:

	npm install
	node app.js

Para facilitar la verificación del código implementé una interfaz sencilla desde donde se puede ingresar casos para los problemas, en el mismo
formato que se especifica en los enunciados. No implementé validaciones de relevancia sobre los inputs, porque no era el eje de la prueba, 
así que recomiendo tener cuidado con los valores ingresados.

Este proyecto se encuentra desplegado en heroku, a través de mi cuenta gratuita:
https://frubana.herokuapp.com/

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Problema 1:
 * El código con el que se atiende el problema se encuentra en code/Problem1.js.
 * El método orquestador, desde el cuál se puede iniciar la lectura del código, se llama resolve.
 * Me tomó cerca de 5 horas (diseño, desarrollo, ajustes "estéticos", pruebas)

 Problema 2:
 * El código con el que se atiende el problema se encuentra en code/Problem2.js.
 * El método orquestador, desde el cuál se puede iniciar la lectura del código, se llama resolve.
 * Me tomó cerca de 7 horas (diseño, desarrollo, ajustes "estéticos", pruebas)

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Respuestas a las preguntas adicionales del último punto

¿Cuáles serían las cualidades para un código limpio?
 En mi trabajo suelo tener en cuenta unas pautas generales para garantizar un código de calidad. Estas pautas serian mi respuesta.
 - Simplicidad: cada unidad de código (ya sea clase, método o entidad), debe tener una única función o utilidad definida. Si no es así, entonces
   se puede dividir en 2 o más componentes.
 - Extensibilidad: Los componentes de código deben ser diseñados teniendo en cuenta las variables sobre las cuales se puede acrecentar el proyecto
   más adelante. De esta forma se logra un código abierto a la modificación y cerrado a la modificación estructural.
 - Unicidad: Idealmente, cada unidad de código usable debe estar encapsulada para que pueda sr empleada desde cualquier lugar, y de esta forma
   evitar el código duplicado.

¿Cuáles serían los estándares según tú para un buen proyecto?
 - Que sea un proyecto en dónde se pueda definir un alcance claro.
 - Que desde el inicio se tengan identificadas las necesidades a solventar.
 - Que desde una fase temprana se conozcan los riegos y que se tomen acciones para mitigarlos o afrontarlos.
 - Que existan mecanismos efectivos de retroalimentación sobre los entregables realizados.

¿Qué patrones conoce y utiliza?
 Enfocando la pregunta hacia patrones de diseño)
 - Singleton: porque es muy útil para gestionar recursos críticos en las aplicaciones.
 - Adaptador: Algunos conocedores del tema no lo consideran un patrón e incluso hay quienes lo llaman un antipatrón, pero en la práctica permite
   controlar las dependencias de nuestro código con librerías y herramientas externas.
 - Strategy: Excelente para parametrizar el comportamiento en objectos con lógica de negocio, en tiempo de ejecución. 
