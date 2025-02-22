/*
 * File: app/view/panelcompras1.js
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

Ext.define('almacen.view.panelcompras1', {
    extend: 'Ext.window.Window',
    alias: 'widget.panelcompras1',

    requires: [
        'almacen.view.panelcomprasViewModel1',
        'almacen.view.panelcomprasViewController1',
        'Ext.form.Panel',
        'Ext.form.field.Tag',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.grid.View',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.feature.Summary'
    ],

    controller: 'panelcompras1',
    viewModel: {
        type: 'panelcompras1'
    },
    height: 493,
    width: 649,
    layout: 'border',
    closable: false,
    title: 'Traspasos',
    maximized: true,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            region: 'north',
            height: 165,
            bodyPadding: 10,
            bodyStyle: 'background-color: #D9D8D8;',
            title: '',
            titleAlign: 'center',
            titleCollapse: true,
            items: [
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    id: 'comboProveedor1',
                    fieldLabel: 'Sucursal',
                    labelPad: 1,
                    labelWidth: 80,
                    displayField: 'nombreProveedor',
                    queryMode: 'local',
                    store: 'StoreSucursales',
                    valueField: 'claveProveedor'
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    id: 'comboClasificacion1',
                    fieldLabel: 'Clasificación',
                    labelPad: 1,
                    labelWidth: 80,
                    allowBlank: false,
                    displayField: 'nombreproducto',
                    forceSelection: true,
                    minChars: 2,
                    queryMode: 'local',
                    store: 'StoreClasificaciones',
                    valueField: 'clasificacion'
                },
                {
                    xtype: 'tagfield',
                    anchor: '100%',
                    id: 'comboProductos1',
                    fieldLabel: 'Producto',
                    labelPad: 1,
                    labelWidth: 80,
                    allowBlank: false,
                    displayField: 'nombreproducto',
                    minChars: 2,
                    queryMode: 'local',
                    store: 'StoreComboProductos',
                    valueField: 'claveproducto'
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
                            id: 'btnBuscarCompra1',
                            icon: 'resources/Search.png',
                            text: 'Consulta Traspasos'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            icon: '\'http://img.informer.com/icons/png/16/5499/5499754.png\'',
                            text: 'Limpiar'
                        },
                        {
                            xtype: 'button',
                            id: 'addProductoCompra1',
                            icon: 'resources/playlist.png',
                            text: 'Agregar'
                        },
                        {
                            xtype: 'label',
                            id: 'lblNoCompra1',
                            width: 100,
                            text: ''
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            region: 'center',
            frame: true,
            id: 'gridproductos1',
            title: '',
            columnLines: true,
            enableColumnHide: false,
            enableColumnMove: false,
            enableColumnResize: false,
            forceFit: true,
            store: 'StoreGridProductosTraspasos',
            columns: [
                {
                    xtype: 'numbercolumn',
                    width: 70,
                    dataIndex: 'cantidad',
                    text: 'Cantidad',
                    editor: {
                        xtype: 'numberfield',
                        id: 'Numcantidad1',
                        enableKeyEvents: true,
                        selectOnFocus: true,
                        minValue: 0,
                        listeners: {
                            afterrender: 'onNumcantidadAfterRender',
                            keyup: 'onNumcantidadKeyup',
                            blur: 'onNumcantidadBlur',
                            focus: 'onNumcantidadFocus'
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'claveproducto',
                    text: 'Clave'
                },
                {
                    xtype: 'gridcolumn',
                    defaultWidth: 78,
                    dataIndex: 'ProporcionAplicar',
                    text: 'Proporcion'
                },
                {
                    xtype: 'gridcolumn',
                    defaultWidth: 304,
                    dataIndex: 'nombreproducto',
                    text: 'Descripcion',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    defaultWidth: 304,
                    dataIndex: 'unidad',
                    text: 'Unidad',
                    flex: 1
                },
                {
                    xtype: 'numbercolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.currency(value);
                    },
                    width: 99,
                    dataIndex: 'costoUnitario',
                    text: 'Precio Unitario',
                    editor: {
                        xtype: 'numberfield',
                        id: 'numCostoUnitario1',
                        selectOnFocus: true,
                        minValue: 0,
                        listeners: {
                            focus: 'onNumCostoUnitarioFocus'
                        }
                    }
                },
                {
                    xtype: 'numbercolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.currency(value);
                    },
                    summaryType: 'sum',
                    id: 'totalCompra',
                    dataIndex: 'importe',
                    text: 'Importe Total',
                    editor: {
                        xtype: 'numberfield',
                        id: 'numImporte1',
                        enableKeyEvents: true
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    height: 36,
                    style: 'background-color: #141314;',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id: 'cancelarCompra1',
                            icon: 'resources/back.png',
                            text: 'Regresar a Compras'
                        },
                        {
                            xtype: 'button',
                            id: 'cleanProductoCompra1',
                            icon: '\'http://img.informer.com/icons/png/16/5499/5499754.png\'',
                            text: 'Limpiar'
                        },
                        {
                            xtype: 'button',
                            id: 'pagarCompra1',
                            icon: '\'http://worksheets.theteacherscorner.net/make-your-own/images/save.png\'',
                            text: 'Guardar'
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btnPrintCompra1',
                            icon: 'resources/print.png',
                            text: 'Imprimir'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: 'background-color: #141314;',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    }
                }
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    listeners: {
                        edit: 'onCellEditingEdit',
                        beforeedit: 'onCellEditingBeforeEdit'
                    }
                }
            ],
            features: [
                {
                    ftype: 'summary',
                    dock: 'bottom'
                }
            ]
        }
    ],

    onNumcantidadAfterRender: function(component, eOpts) {
                /*component.el.swallowEvent([
                    'keypress',
                    'keydown',
                    'keyup'
                    ]);*/


    },

    onNumcantidadKeyup: function(textfield, e, eOpts) {
        if (e.getKey() == Ext.event.Event.ENTER){
            console.log(textfield);
        }
    },

    onNumcantidadBlur: function(component, event, eOpts) {

    },

    onNumcantidadFocus: function(component, event, eOpts) {
        component.selectText();
    },

    onNumCostoUnitarioFocus: function(component, event, eOpts) {
                component.selectText();
    },

    onCellEditingEdit: function(editor, context, eOpts) {
        if ( this.getController("panelComprasViewController1").readOnly) return false;
        if(context.colIdx===0){
            var minimo=context.record.get("minimo");
            var maximo=context.record.get("maximo");
            if(minimo==0&&maximo==0){

            }else{
                if((context.record.get("cantidad")>maximo||context.record.get("cantidad")<minimo)
                   &&context.record.get("cantidad")>0){
                    Ext.Msg.show({
                        title:'Confirmar',
                        message: 'La cantidad ingresada ('  + context.record.get("cantidad") + ') para el producto ' +                                                                     context.record.get("nombreproducto") + ' con unidad '                                                                     + context.record.get("unidad") + ' es correcta?',
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                editor.getController("panelComprasViewController1").calculaImportesTotales(context.record);
                            } else if (btn === 'no') {
                                context.record.beginEdit();
                                context.record.set("cantidad", 0);
                                context.record.endEdit();
                                editor.getController("panelComprasViewController1").calculaImportesTotales(context.record);
                            }
                        }
                    });
                    return;
                }

            }

        }
        if (context.colIdx <= 7){
            if (context.colIdx==7){
                if (!(context.record.get("Impuesto") > " ")){
                    context.record.beginEdit();
                    context.record.set("Impuesto", 0);
                    context.record.endEdit();
                }
            }



            this.getController("panelComprasViewController1").calculaImportesTotales(context.record);
        }else{
            if (context.colIdx==8){

                this.getController("panelComprasViewController1").CalculaImporteUnitario(context.record);
            }
        }

    },

    onCellEditingBeforeEdit: function(editor, context, eOpts) {
        if ( this.getController("panelComprasViewController").readOnly) return false;

        console.log(context.colIdx);
        console.log(context.record);

        if (context.colIdx > 1){

            if ( (context.record.get("cantidad") > 0 || context.grid.columns[0].getEditor().getValue() > 0) && context.record.get("costoTraspaso") === 0   ){
            }else{
                return false;

            }

        }else{
            //se trata de la columna de cantidad


        }
    }

});