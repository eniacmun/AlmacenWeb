/*
 * File: app/view/DlgConsultaPedido.js
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

Ext.define('almacen.view.DlgConsultaPedido', {
    extend: 'Ext.window.Window',
    alias: 'widget.dlgconsultapedido',

    requires: [
        'almacen.view.DlgConsultaPedidoViewModel',
        'almacen.view.DlgConsultaPedidoViewController',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    controller: 'dlgconsultapedido',
    viewModel: {
        type: 'dlgconsultapedido'
    },
    height: 601,
    width: 850,
    layout: 'border',
    title: 'Datos Pedido',

    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            id: 'gridProductos',
            title: 'Productos',
            store: 'StoreDetallePedido',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'claveproductoCedi',
                    text: 'Clave'
                },
                {
                    xtype: 'gridcolumn',
                    width: 185,
                    dataIndex: 'NombreProducto',
                    text: 'Producto'
                },
                {
                    xtype: 'gridcolumn',
                    width: 125,
                    defaultWidth: 120,
                    dataIndex: 'CantidadOriginalSucursal',
                    text: 'Cantidad Original'
                },
                {
                    xtype: 'gridcolumn',
                    width: 134,
                    dataIndex: 'CantidadSucursal',
                    text: 'Cantidad Sucursal'
                },
                {
                    xtype: 'gridcolumn',
                    width: 118,
                    dataIndex: 'CantidadCedi',
                    text: 'Cantidad Cedi'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Importe',
                    formatter: '',
                    text: 'Importe'
                }
            ],
            listeners: {
                afterrender: 'onGridProductosAfterRender'
            }
        },
        {
            xtype: 'gridpanel',
            region: 'north',
            height: 211,
            id: 'gridPedido',
            title: '',
            hideHeaders: true,
            store: 'StoreDatosPedido',
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 273,
                    dataIndex: 'label',
                    text: '.'
                },
                {
                    xtype: 'gridcolumn',
                    width: 345,
                    dataIndex: 'value',
                    text: '.'
                }
            ],
            listeners: {
                afterrender: 'onGridPedidoAfterRender'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    disabled: true,
                    id: 'btnCancelaPedido',
                    icon: 'resources/cancel-icon.png',
                    text: 'Cancelar Pedido',
                    listeners: {
                        click: 'CallCancelaPedido'
                    }
                },
                {
                    xtype: 'button',
                    disabled: true,
                    id: 'btnRecibePedido',
                    icon: 'resources/receive.png',
                    text: 'Recibir',
                    listeners: {
                        click: 'RecibePedido'
                    }
                },
                {
                    xtype: 'button',
                    disabled: true,
                    id: 'btnFinalizaPedido',
                    icon: 'resources/tick.png',
                    text: 'Finalizar',
                    listeners: {
                        click: 'FinalizaPedido'
                    }
                }
            ]
        }
    ]

});