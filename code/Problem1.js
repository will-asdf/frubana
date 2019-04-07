var express = require('express');

var methods = {
    'resolve': function (res, params) {
        try {
            var array = [];     //lista que contendrá los enteros que se adicionen desde el input
            var output = [];    //lista con las medias que tendrá el array después de cada operación de adición o remoción

            params.operations.forEach(function (value) {
                if (value.trim().length > 0) {
                    var splited_value = value.trim().split(" ");
                    var operation = splited_value[0].toUpperCase();
                    var item = parseInt(splited_value[1]);

                    // En función del input, se insertará o quitará cierto item del array
                    if (operation == 'A') {
                        array = methods.add_item_to_array(array, item);
                    }
                    else {
                        if (array.length > 0) {
                            array = methods.remove_item_to_array(array, item);
                        }
                    }
                    // Después de la operación, se revisa la media del array
                    var media = methods.get_media(array);
                    output.push(media);
                }
            });

            res.json({ 'success': true, 'output': output });
        }
        catch (ex) {
            res.json({ 'success': false, 'message': String(ex) });
        }
    },
    get_media: function (array) {
        // En este método se calcula la media del array:
        // - Cuando el array está vacío se retorna la palabra Wrong!
        // - Cuando hay un número par de items en el array, la media será el promedio de los 2 items centrales
        // - Caundo hay un número impar de items en el array, la media será el item central
        var array_length = array.length;
        var mid_index = array_length / 2;

        if (array_length == 0) {
            return 'Wrong!';
        }
        else if (array_length % 2 == 0) {
            return (array[mid_index] + array[mid_index - 1]) / 2;
        }
        else {
            return array[Math.floor(mid_index)];
        }
    },
    get_middle: function (array) {
        var mid_index = array.length / 2;
        if (array.length % 2 == 0) {
            return { 'index': mid_index - 1, 'item': array[mid_index - 1]};
        }
        else {
            return { 'index': Math.floor(mid_index), 'item': array[Math.floor(mid_index)] };
        }
    },
    add_item_to_array: function (array, new_item) {
        // En este método se inserta un entero en un array ordenado, de forma recursiva
        // - Mientras el array parámetro tenga más de un item, se comparará al nuevo item contra la mitad del array.
        //   Sabiendo si el nuevo item es mayor o menor que la mitad del array, se puede revisar la parte derecha o izquierda del array,
        //   revisando de forma recursiva hasta llegar a uno de los 2 casos base: un array de un 1 elemento, o de 0 elementos (sólo cuando el array original está vacío)
        // - Un atajo se presenta cuando el item es igual que la mitad del array. En este caso basta con poner el item justamente antes o después de la mitad
        if (array.length > 1) {
            var mid = methods.get_middle(array);
            if (mid.item == new_item) {
                array.splice(mid.index, 0, new_item);
                return array;
            }
            else if (mid.item > new_item) {
                var left_part = methods.add_item_to_array(array.slice(0, mid.index), new_item);
                var right_part = array.slice(mid.index);
                return left_part.concat(right_part);
            }
            else {
                var left_part = array.slice(0, mid.index + 1);
                var right_part = methods.add_item_to_array(array.slice(mid.index + 1), new_item);
                return left_part.concat(right_part);
            }
        }
        else if (array.length == 1) {
            var unique_item = array[0];
            if (unique_item > new_item) {
                return [new_item, unique_item];
            }
            else {
                return [unique_item, new_item];
            }
        }
        else {
            return [new_item];
        }
    },
    remove_item_to_array: function (array, old_item) {
        // En este método se inserta un entero en un array ordenado, de forma recursiva
        // En esencia, es muy similar al método add_item_to_array, así que podrían fusionarse en un sólo método
        // pero se decide mantenerse así para mantener más explícito el código
        if (array.length > 1) {
            var mid = methods.get_middle(array);
            if (mid.item == old_item) {
                array.splice(mid.index, 1);
                return array;
            }
            else if (mid.item > old_item) {
                var left_part = methods.remove_item_to_array(array.slice(0, mid.index), old_item);
                var right_part = array.slice(mid.index);
                return left_part.concat(right_part);
            }
            else {
                var left_part = array.slice(0,mid.index + 1);
                var right_part = methods.remove_item_to_array(array.slice(mid.index + 1), old_item);
                return left_part.concat(right_part);
            }
        }
        else if (array.length == 1) {
            var unique_item = array[0];
            if (unique_item == old_item) {
                return [];
            }
            else {
                return [unique_item];
            }
        }
    },
};

module.exports = methods;
