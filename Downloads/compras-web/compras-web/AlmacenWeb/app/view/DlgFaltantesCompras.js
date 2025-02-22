/*
 * File: app/view/DlgFaltantesCompras.js
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

Ext.define('almacen.view.DlgFaltantesCompras', {
    extend: 'Ext.window.Window',
    alias: 'widget.dlgfaltantescompras',

    requires: [
        'almacen.view.DlgFaltantesComprasViewModel',
        'Ext.grid.Panel',
        'Ext.grid.filters.filter.String',
        'Ext.grid.filters.filter.List',
        'Ext.grid.column.Number',
        'Ext.grid.filters.Filters',
        'Ext.grid.column.Boolean',
        'Ext.grid.filters.filter.Boolean',
        'Ext.grid.filters.filter.Number'
    ],

    viewModel: {
        type: 'dlgfaltantescompras'
    },
    height: 523,
    width: 753,
    layout: 'border',
    title: 'Faltantes en Compras',
    modal: true,

    items: [
        {
            xtype: 'gridpanel',
            region: 'south',
            height: 250,
            id: 'gridFaltantesProducciones',
            title: 'Faltantes en Producciones',
            forceFit: true,
            store: 'StoreFaltantesProducciones',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Clave',
                    text: 'Clave',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Clasificacion',
                    text: 'Clasificación',
                    filter: {
                        type: 'list'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Concepto',
                    text: 'Concepto',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'Equivalencia2',
                    text: 'Existencia'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Unidad',
                    text: 'Unidad',
                    filter: {
                        type: 'list'
                    }
                },
                {
                    xtype: 'booleancolumn',
                    text: 'Inv. Diario',
                    falseText: 'No',
                    trueText: 'Si',
                    filter: {
                        type: 'boolean',
                        yesText: 'Si'
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'gridfilters'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            region: 'center',
            id: 'gridFaltantesCompras',
            frameHeader: false,
            header: false,
            title: '',
            forceFit: true,
            store: 'StoreFaltantesCompras',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Clave',
                    text: 'Clave',
                    filter: {
                        type: 'number'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Clasificacion',
                    text: 'Clasificación',
                    filter: {
                        type: 'list'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Concepto',
                    text: 'Concepto',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'Equivalencia2',
                    text: 'Existencia'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'Unidad',
                    text: 'Unidad',
                    filter: {
                        type: 'list'
                    }
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'InventarioDiario',
                    text: 'Inv. Diario',
                    falseText: 'No',
                    trueText: 'Si',
                    filter: {
                        type: 'boolean',
                        yesText: 'Si'
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'gridfilters'
                }
            ]
        }
    ]

});