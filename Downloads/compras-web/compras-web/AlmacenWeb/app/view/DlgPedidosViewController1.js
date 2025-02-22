/*
 * File: app/view/DlgPedidosViewController1.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('almacen.view.DlgPedidosViewController1', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dlgdetalleimpresion',

    onBtnImpresionProductoClick: function(button, e, eOpts) {
        // se verifica que esta seleccionado
        //var selecciones = Ext.getCmp('gridCedis1').getSelectionModel();
        var selection_model = Ext.getCmp('gridCedis1').getSelection();

        var selecciones = {};

        if(selection_model.length){
            var name='';
            selection_model.map(item=>{
                console.log(item);
                console.log(item.data.nombreProveedor);
                selecciones[item.data.nombreProveedor] = item.data.claveProveedor; // se agrega un registro
            });
        }else{
            Ext.Msg.alert('', 'Eliga una sucursal primero.');
            return;
        }

        console.log("selecciones");console.log(selecciones);

        // se obtiene cuantas sucursales son con pedidos
        var number_columns = window.sucursales_con_pedidos.length;
        var columns_start = 5;

        // se ensambla ell dato que llevara el request
        var Productos = [];

        var grid = Ext.ComponentMgr.get("GridProductosCedis");

        var obtenerSucursalControllerFunction = this.obtenerSucursal;

        grid.getStore().each(function(rec){
            var Sucursales = [];
            var fields = rec.getFields();
            for(var cliente = columns_start; cliente < (columns_start + number_columns); cliente++){
                var column_name = fields[cliente].name;
                var sucursal_data = almacen.getApplication().obtenerSucursal(column_name);
                if (sucursal_data.sucursal in selecciones && rec.get(column_name) > 0){ // solo se agregara la sucursal si existe en las selecciones y tiene cantidad mayor a cero
                    var a = {sucursal: sucursal_data.sucursal, clavesucursal: sucursal_data.clavesucursal, cantidad: rec.get(column_name)};
                    Sucursales.push(a);
                }
            }
            Productos.push({
                claveproducto:  rec.get('claveproducto'),
                concepto:  rec.get('concepto'),
                sucursales: Sucursales
            });
        });

        console.log(Productos);

        // se ensambla el html

        //var html = "<div id='myId' style = 'margin: 20px; border: 20px;'><p>Hola</p></div>";
        var html = "<font size='1'>";
        var sangria = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
        var tab = '&nbsp&nbsp&nbsp&nbsp';
        var tabmin = '&nbsp&nbsp';

        html += tab + 'IMPRESIÓN DE PEDIDOS POR INSUMO' + '<br>';

        // se agrega la fecha

        var date  = new Date();
        /*var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hour = date.getHours();

        if(seconds === 0){
        seconds = '00';
        }

        var fecha = day + '/' + monthIndex + '/' + year + tab + hour + ':' + minutes + ':' + seconds;

        */

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        var fecha =  date.toLocaleDateString("es-ES", options); // masrtes, 1 de enero de 2019

        var datetext = date.toTimeString();

        datetext = datetext.split(' ')[0];


        html += tabmin + 'IMPRESIÓN:'+ tabmin + (fecha.toUpperCase() + '&nbsp' + datetext ) + '<br>';


        for(var i = 0; i< Productos.length; i++){
            var producto = Productos[i];
            if(producto.sucursales.length > 0){ // Producto con pedidos en sucursales
                html += producto.claveproducto + "-" + producto.concepto;
                html += '<br>';
                var cantidad_acumulada = 0.0;
                for(var j = 0; j < producto.sucursales.length; j++){
                    var currentSucursal = producto.sucursales[j];
                    if(currentSucursal.cantidad > 0){
                        html += sangria + currentSucursal.sucursal + tab + ':' + tab + currentSucursal.cantidad;
                        html += '<br>';
                        cantidad_acumulada += currentSucursal.cantidad;
                    }
                }
                html += sangria + '&nbsp&nbsp Total ' + tab + ':' + tab + cantidad_acumulada;
                html += '<br>';
                html += '<br>';
            }

        }

        html += '</font>';

        //console.log(html);

        Ext.getCmp('ticketImpresion').update(html);

    },

    onBtnImpresionSucursalClick: function(button, e, eOpts) {
        // se verifica que esta seleccionado
        //var selecciones = Ext.getCmp('gridCedis1').getSelectionModel();
        var selection_model = Ext.getCmp('gridCedis1').getSelection();

        var selecciones = {};

        if(selection_model.length){
            var name='';
            selection_model.map(item=>{
                //console.log(item);
                //console.log(item.data.nombreProveedor);
                selecciones[item.data.nombreProveedor] = item.data.claveProveedor; // se agrega un registro
            });
        }else{
            Ext.Msg.alert('', 'Eliga una sucursal primero.');
            return;
        }

        console.log("selecciones");console.log(selecciones);

        //

        // guardara n numero de pedidos por columna equivalente al numero de sucursales que hayan realizado pedidos
        var Pedidos = [];

        // se obtiene el grid por ID, este grid es el que contiene los productos.
        var grid=Ext.ComponentMgr.get("GridProductosCedis");


        // se crea el vector de sucursales, un registro por cada sucursal.
        var sucursales = [];

        // Se obtienen el numero de sucursales con pedidos por medido de una variable global,
        // debido a que los metodos del grid no devolveran las columnas dinamicamente.
        var number_columns = window.sucursales_con_pedidos.length;
        //console.log("window.sucursales_con_pedidos: "); console.log(window.sucursales_con_pedidos);

        //console.log("Numero de sucursales(columnas): "  +number_columns);

        // Indice en donde empiezan las sucursales en el grid
        var sucursales_start = 5;

        // se guardan los pedidos por columnas
        for(var pedido = 0; pedido < number_columns; pedido ++){

            // se definen el vector de los productos
            var productos = [];

            // la siguiente es una muestra de como tiene que estructurarse
            /*productos.push({
            "claveproducto":"TEQ.026",
            "cantidad":3.25,
            "Importe":1353.9825,
            "costo":416.61,
            "Concepto":"SIETE LEGUAS BLANCO 1 LT",
            "Unidad":"BOTELLA"

            });*/

            var sucursal_name = "";

            // se itera el grid para rellenar los productos
            grid.getStore().each(function(rec){

                // se obtiene el nombre de la sucursal
                var fields = rec.getFields();
                sucursal_name = fields[sucursales_start].name;
                var sucursal_data = almacen.getApplication().obtenerSucursal(sucursal_name);
                if(sucursal_data.sucursal in selecciones){ // solo se toma en cuenta la sucursal si existe en las selcciones

                    // Se verifica que la cantidad en esa sucursal sea mayor que cero (verificar, puede que si se tengan que registrar los ceros)
                    if (rec.get(sucursal_name) > 0 /* && rec.get("Agregar")*/){

                        // se calcula el importe nuevamente, dado que sencha no guarda el importe en rec.get("importe")
                        // se aplica tambien redondeo
                        var importe = rec.get(sucursal_name) * rec.get("precio");
                        //console.log("importe: " + importe);
                        importe = (Math.round(importe * 100) / 100); // redondeo a dos digitos
                        // se ensambla el producto
                        var current_record = {
                            "claveproducto": rec.get("claveproducto"),
                            "cantidad":rec.get(sucursal_name),
                            "Importe": importe,
                            "costo":rec.get("precio"),
                            "Concepto":rec.get("concepto"),
                            "Unidad":rec.get("unidad")
                        };

                        // se agrega el producto al vector
                        productos.push(current_record);
                    }
                }
            });

            if(productos.length > 0){ // Se leyeron los productos de la sucursal.
                var sucursal_data = almacen.getApplication().obtenerSucursal(sucursal_name);
                var pedidos = sucursal_data.extra_data;
                var pedidos_clean = "";
                pedidos.split(",").forEach(function(pedido){pedidos_clean += pedido.split(" ")[0].substring(1) + ",";});
                pedidos_clean = pedidos_clean.substring(0, pedidos_clean.length-1);
                // se ensambla la sucursal pasando los parametros necesarios.
                // el vector window.sucursales_con_pedidos se ensambla al cargar los productos del Cedis en onGridpanelBeforeRender
                sucursales.push({
                    "claveSucursal": window.sucursales_con_pedidos[pedido].clavesucursal, // se toma la clave sucursal del vector global de pedidos de sucursales
                    "productos" : productos,
                    "nombreSucursal": window.sucursales_con_pedidos[pedido].sucursal.toUpperCase(), //sucursal_name.toUpperCase(),
                    "claveNota":0,
                    "claveDocumentoSucursal":0,
                    "pedidos": pedidos_clean
                });
            }

            // se agrega al vector de pedidos
            //Pedidos.push(sucursales);

            // se pasa a la siguiente columna
            sucursales_start += 1;
        }

        //console.log("Pedidos");console.log(Pedidos);
        console.log("sucursales");console.log(sucursales);


        // Se crea request
        var gridProductos = Ext.ComponentMgr.get("wndDetalleImpresion");
        var el = gridProductos.getEl();
        el.mask('Realizando impresión, espere por favor.');

        var pedidosImprimir = {};

        pedidosImprimir.sucursales = sucursales;

        var request = new Object(); request.method="impresionpedidossucursal"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        request.params.push({"name":"pedido","value": Ext.encode(pedidosImprimir)});

        console.log("request");
        console.log(request);

        var currentController = this;

        almacen.getApplication().loadData(request,function(response){

            if(response.status){

                console.log("Impresión");
                console.log(response.clave);

                // se ensambla el html
                //var html = "<div id='myId' style = 'margin: 20px; border: 20px;'><p>Hola</p></div>";
                var html = "<font size='3'>";
                var sangria = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                var tab = '&nbsp&nbsp&nbsp&nbsp';
                var tabmin = '&nbsp&nbsp';
                var tabexmin = '&nbsp';

                html += "<p style='font-family:monospace'>";

                response.clave = response.clave.replace(/(?:\r\n|\r|\n)/g, '<br>');
                response.clave = response.clave.replace(/ /g, tabexmin);

                html += response.clave;

                html += '</p>';
                html += '</font>';

                Ext.getCmp('ticketImpresion').update(html);

            }else{
                Ext.Msg.alert("Error en Imresión", response.msg);
            }

            el.unmask();

        },function(response){
            el.unmask();
        });

    }

});
