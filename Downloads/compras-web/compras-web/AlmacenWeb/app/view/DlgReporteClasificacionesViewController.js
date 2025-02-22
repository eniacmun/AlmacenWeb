/*
 * File: app/view/DlgReporteClasificacionesViewController.js
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

Ext.define('almacen.view.DlgReporteClasificacionesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dlgreporteclasificaciones',

    onGridClasificacionesVentaAfterRender: function(component, eOpts) {
        component.getStore().removeAll();

        var el = component.getEl();

        // se da un espacio de tiempo corto para que el render del mask quede al centro.
        setTimeout(function() {
            el.mask("Consultando clasificaciones");
            var request = new Object(); request.method="clasificacionesventa"; request.params=[];
            request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
            almacen.getApplication().loadData(request,function(response){
                el.unmask();
                console.log(response.productos);
                component.getStore().loadData(response.productos);
                component.getStore().sort('nombreproducto','ASC');
                //Ext.ComponentMgr.get("comboClasificacion").getPicker().loadMask.hide();
            }, function(response){
                Ext.Msg.alert("Error al consultar las clasificaciones");
                console.log(response);
                el.unmask();
            });
        },100);
    },

    onGeneraReporteClick: function(button, e, eOpts) {
        var grid = Ext.ComponentMgr.get("gridReporteClasificaciones");

        var el = grid.getEl();

        var array = {};
        array.productos = [];

        grid.getStore().each(function(record){
            console.log(record);
            if (record.get("selector")){
                array.productos.push(record.data);
            }
        });


        console.log(array);

        var request = new Object(); request.method="reporteclasificacionesbi"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        request.params.push({"name":"Clasificaciones","value":Ext.encode(array)});

        el.mask("Generando reporte...");

        almacen.getApplication().loadData(request,function(response){
            el.unmask();
            console.log(response);
            if(response.status){
                Ext.Msg.alert("Generación correcta", "Se descargará su reporte en breve");
                var controller=Ext.WindowManager.get("wndReporteClasificaciones").parentController;
                controller.descargarReporte(4);
                Ext.WindowManager.get("wndReporteClasificaciones").close();
            } else{
                Ext.Msg.alert("Error", response.msg);
            }
        }, function(response){
            el.unmask();
            console.log(response);
        });
    }

});
