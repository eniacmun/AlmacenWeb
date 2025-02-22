/*
 * File: app/store/StoreNoImpresiones.js
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

Ext.define('almacen.store.StoreNoImpresiones', {
    extend: 'Ext.data.Store',

    requires: [
        'almacen.model.mdlImpresiones',
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'StoreNoImpresiones',
            autoLoad: true,
            model: 'almacen.model.mdlImpresiones',
            data: [
                {
                    numero: 0
                },
                {
                    numero: 1
                },
                {
                    numero: 2
                },
                {
                    numero: 3
                }
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});