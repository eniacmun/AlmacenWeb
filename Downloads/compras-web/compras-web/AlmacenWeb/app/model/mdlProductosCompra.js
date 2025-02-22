/*
 * File: app/model/mdlProductosCompra.js
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

Ext.define('almacen.model.mdlProductosCompra', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Boolean',
        'Ext.data.field.Integer'
    ],

    fields: [
        {
            name: 'Impuesto'
        },
        {
            name: 'claveproducto'
        },
        {
            name: 'costoUnitario'
        },
        {
            name: 'precioAnterior'
        },
        {
            name: 'nombreproducto'
        },
        {
            name: 'cantidad'
        },
        {
            name: 'Proporcion'
        },
        {
            name: 'importe'
        },
        {
            name: 'Descuento'
        },
        {
            name: 'unidad'
        },
        {
            name: 'ProporcionAplicar'
        },
        {
            name: 'minimo'
        },
        {
            name: 'maximo'
        },
        {
            name: 'costomaximo'
        },
        {
            name: 'costominimo'
        },
        {
            name: 'xmlNoIdentificacion'
        },
        {
            name: 'xmlProporcionExterna'
        },
        {
            name: 'xmlNombreProducto'
        },
        {
            name: 'xmlCantidad'
        },
        {
            type: 'boolean',
            name: 'tieneImpuesto'
        },
        {
            type: 'boolean',
            name: 'xmlModificaProporcion'
        },
        {
            type: 'int',
            name: 'idTasa'
        },
        {
            name: 'tasa'
        },
        {
            name: 'claveBarra'
        },
        {
            name: 'MyField219'
        },
        {
            name: 'impuestoCambiadoValidacion'
        },
        {
            name: 'unidadmateria'
        },
        {
            name: 'costoTraspaso'
        },
        {
            name: 'claveXML'
        },
        {
            name: 'ie'
        }
    ]
});