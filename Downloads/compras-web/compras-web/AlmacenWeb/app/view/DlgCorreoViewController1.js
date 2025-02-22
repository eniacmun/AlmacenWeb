/*
 * File: app/view/DlgCorreoViewController1.js
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

Ext.define('almacen.view.DlgCorreoViewController1', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dlgagregaproductos',

    onComboboxBeforeRender: function(component, eOpts) {
        component.getStore().removeAll();

        var request = new Object(); request.method="clasificaciones"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        almacen.getApplication().loadData(request,function(response){
            component.getStore().loadData(response.productos);
            component.getStore().sort('nombreproducto','ASC');
        });
    },

    onComboboxSelect: function(combo, records, eOpts) {
        var request = new Object(); request.method="productoscompra"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId},
        {"name":"clasificacion","value":combo.getValue()});
        almacen.getApplication().loadData(request,function(response){
            Ext.ComponentMgr.get("comboProductos").getStore().loadData(response.productos);
            Ext.ComponentMgr.get("comboProductos").getStore().sort('nombreproducto','ASC');
        });
    }

});
