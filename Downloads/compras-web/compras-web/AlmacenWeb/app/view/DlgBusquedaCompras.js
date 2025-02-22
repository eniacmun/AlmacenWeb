/*
 * File: app/view/DlgBusquedaCompras.js
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

Ext.define('almacen.view.DlgBusquedaCompras', {
    extend: 'Ext.window.Window',
    alias: 'widget.dlgbusquedacompras',

    requires: [
        'almacen.view.DlgBusquedaComprasViewModel',
        'almacen.view.DlgBusquedaComprasViewController',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    config: {
        parentController: null
    },

    controller: 'dlgbusquedacompras',
    viewModel: {
        type: 'dlgbusquedacompras'
    },
    autoScroll: true,
    height: 368,
    id: 'wndBusquedaCompras',
    width: 646,
    title: 'Buscar Compras',
    modal: true,

    items: [
        {
            xtype: 'gridpanel',
            autoScroll: true,
            id: 'gridBusquedaCompras',
            overlapHeader: false,
            title: '',
            columnLines: true,
            enableColumnHide: false,
            enableColumnMove: false,
            enableColumnResize: false,
            forceFit: true,
            reserveScrollbar: true,
            store: 'StoreGridCompras',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'claveCompra',
                    text: 'Numero Compra'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'proveedor',
                    text: 'Proveedor'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'Total',
                    text: 'Total'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'estado',
                    text: 'Estado'
                }
            ],
            selModel: {
                selType: 'rowmodel'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            style: 'background-color: #141314;',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    id: 'btnCancelarBCompras',
                    icon: '\'http://icons.iconarchive.com/icons/led24.de/led/16/cancel-icon.png\'',
                    text: 'Cancelar'
                },
                {
                    xtype: 'button',
                    id: 'btnAceptarBCompras',
                    icon: '\'https://glnd.alexanderstreet.com/ui/common/playlist.png\'',
                    text: 'Aceptar'
                }
            ]
        }
    ]

});