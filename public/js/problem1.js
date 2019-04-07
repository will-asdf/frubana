var p1 = {}

p1.urls = {
    resolve_problem: '/resolveproblem1'
}

p1.constants = {
    input_id: '#txtinput',
    output_id: '#txtoutput'
}

p1.methods = {
    resolve: function () {
        var raw_input = $(p1.constants.input_id).val();
        if ($.trim(raw_input).length > 0) {
            var input_list = raw_input.split('\n');
            if (input_list.length > 1) {
                var params = {
                    num_operations: input_list[0],
                    operations: input_list.slice(1)
                }

                $.ajax({
                    type: "POST",
                    url: p1.urls.resolve_problem,
                    data: JSON.stringify(params),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.hasOwnProperty('success')) {
                            if (data.success) {
                                var output = data.output.join('\n');
                                $(p1.constants.output_id).val(output);
                            }
                            else {
                                alert(data.message);
                            }
                        }
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        alert('error: ' + String(errorThrown));
                    }
                });
            }
            else {
                alert('uuuu');
            }
        }
        else {
            alert('uuuu');
        }
    }
}
