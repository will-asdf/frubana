var express = require('express');
var methods = {
    'resolve': function (res, params) {
        try {
            // 1. Definir nodos del árbol (id y color por nodo)
            var initial_data = methods.initialize_nodes(params.colors);
            var heads_list = initial_data.heads_list;   //lista con los ids de los nodos. Se procesará para que sólo tenga los nodos sin padre
            var nodes_list = initial_data.nodes_list;   //lista con nodos. Los nodos tendrán 2 atributos: id y color
            var colors_dict = initial_data.colors_dict; //diccionario que para un id de nodo, retorna el color asociado

            // 2. Definir las relaciones entre nodos
            //    el método get_childs_from_edges también setea el parámetro heads_list, dejandole sólo los ids de nodos sin padre
            var childs_per_node_dict = methods.get_childs_from_edges(params.edges, heads_list); //diccionario que para cada id de nodo, retorna una lista con los ids de los nodos hijos

            // 3. Validar que el árbol especificado sólo tenga un padre
            if (heads_list.length > 1) {
                return res.json({ 'success': false, 'message': 'El árbol tiene más de una raíz' });
            }
            if (heads_list.length == 0) {
                return res.json({ 'success': false, 'message': 'El árbol no tiene raíz' });
            }

            // 4. Identificar las rutas desde el nodo raíz, hasta cada uno de los nodos del árbol
            var paths_dict = methods.get_paths(childs_per_node_dict, heads_list[0]); //diccionario que para cada id de nodo, retorna una lista de los ids de los nodos que se recorren desde la raíz hasta él.

            // 5. Calcular el número de colores diferentes que presenta cada nodo en cada uno de sus rutas hacia otros nodos
            var output = methods.calculate_sum_colors(nodes_list, colors_dict, paths_dict);  // Lista con los valores acumulados de colores diferentes recorridos por nodo

            res.json({ 'success': true, 'output': output });
        }
        catch (ex) {
            res.json({ 'success': false, 'message': String(ex) });
        }
    },
    initialize_nodes: function (param_colors_input) {
        var heads = [];
        var nodes = [];
        var colors = {};

        param_colors_input.forEach(function (value, index) {
            var node = {
                id: index + 1,
                color: value
            };
            nodes.push(node);
            heads.push(parseInt(node.id));
            colors[node.id] = value;
        });

        var result = {
            'heads_list': heads,
            'nodes_list': nodes,
            'colors_dict': colors
        }

        return result;
    },
    get_childs_from_edges: function (edges, heads) {
        var childs = {};
        edges.forEach(function (value, index) {
            if (value.trim().length > 0) {
                var value_split = value.trim().split(" ");
                var father_id = parseInt(value_split[0]);
                var child_id = parseInt(value_split[1]);

                //Se retira del arreglo de heads al nodo especificado como hijo en esta relación
                var head_index = heads.indexOf(child_id);
                if (head_index > -1) {
                    heads.splice(head_index, 1);
                }

                //Se guarda en childs, la relación
                if (!childs.hasOwnProperty(father_id)) {
                    childs[father_id] = [];
                }
                childs[father_id].push(child_id);
            }
        });
        return childs;
    },
    get_paths: function (childs_dict, node_id, paths = {}, father_id = null) {
        var path_node = [node_id];
        if (father_id != null) {
            var father_path = paths[father_id];
            path_node = father_path.concat(path_node); 
        }
        paths[node_id] = path_node;

        if (childs_dict.hasOwnProperty(node_id)) {
            childs_dict[node_id].forEach(function (child_id) {
                methods.get_paths(childs_dict, child_id, paths, node_id);
            });
        }

        return paths;
    },
    calculate_sum_colors: function (nodes_list, colors_dict, paths_dict) {
        var num_colors_calculated = {}; //En este diccionario se guardará el número de colores diferentes entre un nodo A y un nodo B. 
        // Se compara cada nodo contra todos los nodos, para calcular los subtotales
        var output = nodes_list.map(function (nodeA, indexA, array) {
            var subtotals = array.map(function (nodeB, indexB) {
                // Al comparar un nodo A contra un nodo B hay 3 situaciones:
                var key = [nodeA.id, nodeB.id].sort();  // llave para persirtir en num_colors_calculated, los valores calculados para A y B
                // - Cuando A y B son el mismo nodo sólo hay un color
                if (nodeA.id == nodeB.id) {
                    return 1;
                }
                // Cuando previamente se ha contado el número de colores entre los nodos A y B, y ahora se pregunta por B y A (lo mismo)
                else if (num_colors_calculated.hasOwnProperty(key)) {
                    return num_colors_calculated[key];
                }
                // Cuando no se ha contado el número de colores entre A y B, o B y A
                else {
                    // Se identifica el trayecto entre A y B, comparando sus trayectos desde la raíz
                    var subpath = methods.get_path_between_nodes(nodeA, nodeB, paths_dict);
                    // Se cuentan los colores diferentes que hay entre trayecto de A y B
                    var num_colors = methods.identify_num_colors_on_path(subpath, colors_dict);
                    num_colors_calculated[key] = num_colors;
                    return num_colors;
                }
            });
            // para cada nodo de 1 a n, se retorna la suman de colores contados desde él hasta sus hermanos
            return subtotals.reduce((x, y) => (x + y));
        });

        return output;
    },
    get_path_between_nodes: function (nodeA, nodeB, paths_dict) {
        var pathA = paths_dict[nodeA.id];
        var pathB = paths_dict[nodeB.id];
        var intersection = ((pathA.length < pathB.length) ? pathA.length - 1: pathB.length -1);

        while (intersection >= 0) {
            if (pathA[intersection] == pathB[intersection]) {
                break;
            }
            intersection-=1;
        }

        var subpathA = pathA.slice(intersection + 1);
        var subpathB = pathB.slice(intersection + 1);

        var path_between = subpathA.reverse();
        path_between.push(pathA[intersection]);
        path_between = path_between.concat(subpathB);

        return path_between;
    },
    identify_num_colors_on_path: function (path, nodes_dict) {
        var colors = [];
        path.forEach(function (current_node_id) {
            var color = nodes_dict[current_node_id];
            if (!colors.includes(color)) {
                colors.push(color);
            }
        });
        return colors.length;
    }
};

module.exports = methods;
