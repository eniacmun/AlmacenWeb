/*
 * File: app/view/mainViewPort.js
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

Ext.define('almacen.view.mainViewPort', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'almacen.view.mainViewPortViewModel',
        'almacen.view.mainViewPortViewController',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.Img',
        'Ext.form.Label'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    id: 'appViewPort',
    layout: 'border',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            type: 'border',
            forceLayout: true,
            collapseMode: 'header',
            region: 'north',
            split: false,
            splitterResize: false,
            height: 40,
            id: 'toolbar',
            animCollapse: true,
            collapsed: true,
            collapsible: true,
            header: false,
            headerPosition: 'right',
            hideCollapseTool: true,
            overlapHeader: false,
            placeholderCollapseHideMode: 3,
            title: '',
            titleCollapse: true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    height: 40,
                    style: 'background-color: #141314;',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnCedis',
                            icon: 'resources/almacen.png',
                            text: 'Cedis'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnCompra',
                            icon: 'resources/icon_purchase.png',
                            text: 'Compras'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnPedidos',
                            icon: 'resources/cart.png',
                            text: 'Pedidos'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnInventarios',
                            icon: 'resources/almacen.png',
                            text: 'Consulta Inventarios'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnAjuste',
                            icon: 'resources/table-edit.png',
                            text: 'Conteo de Inventario'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnMerma',
                            icon: 'resources/chocolate-bite-icon.png',
                            text: 'Baja de Inventario'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnSupervision',
                            icon: 'resources/Search.png',
                            text: 'Supervisión'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnTransferencia',
                            icon: 'resources/transfer.png',
                            text: 'Transferencia'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnProduccion',
                            icon: 'resources/factory-icon.png',
                            text: 'Producción'
                        },
                        {
                            xtype: 'button',
                            id: 'btnLogout',
                            icon: 'resources/logout.png',
                            text: 'Salir'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'image',
                            hidden: true,
                            id: 'aLoader',
                            width: 16,
                            src: 'resources/ajax-loader.gif'
                        },
                        {
                            xtype: 'label',
                            id: 'lblWelcome',
                            text: ''
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            html: '\'<style type="text/css"> html, body, #wrapper {    height:100%;    width: 100%;    margin: 0;    padding: 0;    border: 0; } #wrapper td {    vertical-align: middle;    text-align: center; } </style>  <body> <table id="wrapper">       <tr>          <td><img src="http://www.grupotelnet.net:8082/grupotelnet.net/images/Logo-Telnet.png" alt="" /></td>       </tr>    </table> </body>\'\'',
            id: 'centerPanel',
            style: 'background-color: #CECECE;',
            layout: 'fit',
            bodyStyle: 'background-color: #CECECE;',
            header: false,
            icon: 'resources/main.ico'
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    },

    onViewportAfterRender: function(component, eOpts) {
                    //Ext.ComponentMgr.get("toolbar").collapse(Ext.Component.DIRECTION_TOP, true);

                    var wnd = Ext.create("almacen.view.DlgLogin");
                    wnd.center();
                    wnd.show();
    }

});