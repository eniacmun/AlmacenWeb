/*
 * File: app/view/panelInventariosViewController.js
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

Ext.define('almacen.view.panelInventariosViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelinventarios',

    control: {
        "#cmbClasificaciones": {
            beforerender: 'loadClasificaciones'
        },
        "#cmbProveedoresMateria": {
            beforerender: 'loadProveedoresMaterias'
        },
        "#cmbSubAlmacenes": {
            beforerender: 'loadSubAlmacenes'
        },
        "button#btnConsultar": {
            click: 'loadExistencias'
        },
        "#gridConsultaClasificaciones": {
            beforerender: 'LimpiaGrid'
        },
        "button#btnPrint": {
            click: 'ImprimeInventario'
        }
    },

    loadClasificaciones: function(component, eOpts) {
        var request = new Object(); request.method="clasificacionesinventario"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        almacen.getApplication().loadData(request,function(response){
            component.getStore().loadData(response.items);
            component.getStore().sort('label','ASC');
        });
    },

    loadProveedoresMaterias: function(component, eOpts) {
        var request = new Object(); request.method="proveedormateria"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        almacen.getApplication().loadData(request,function(response){
            console.log("loadProveedoresMaterias response",response);
            component.getStore().loadData(response.items);
            component.getStore().sort('label','ASC');
        });
    },

    loadSubAlmacenes: function(component, eOpts) {
        //var controller = this;

        console.log("loading subalmacenes");
        var request = new Object(); request.method="obtienesubalmacenes"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        almacen.getApplication().loadData(request,function(response){
            component.getStore().loadData(response.items);
            component.getStore().sort('label','ASC');
            Ext.ComponentQuery.query('#cmbSubAlmacenes')[0].setValue(almacen.getApplication().currentSession.claveAlmacenGeneral);
            if(Ext.ComponentMgr.get("cmbSubAlmacenes1")){
                Ext.ComponentQuery.query('#cmbSubAlmacenes1')[0].setValue(almacen.getApplication().currentSession.claveAlmacenGeneral);
            }
        });
    },

    loadExistencias: function(button, e, eOpts) {
        console.log("loadExistencias");

        if(almacen.getApplication().currentSession.subAlmacenes){
            var cmbSubAlmacenes = Ext.ComponentMgr.get("cmbSubAlmacenes");
            if(cmbSubAlmacenes){
                var selectedSubAlmacen = Ext.ComponentMgr.get("cmbSubAlmacenes").getValue();
                if(selectedSubAlmacen){
                    this.loadExistenciaAlmacen(button,e,eOpts,selectedSubAlmacen);
                } else{
                    this.loadExistenciaAlmacen(button,e,eOpts,almacen.getApplication().currentSession.claveAlmacenGeneral);
                }
            }else{
                this.loadExistenciaAlmacen(button,e,eOpts,almacen.getApplication().currentSession.claveAlmacenGeneral);
            }
        } else {
            this.loadExistenciaAlmacen(button,e,eOpts,null);
        }
    },

    LimpiaGrid: function(component, eOpts) {
        component.getStore().removeAll();
        console.log("Limpiando grid");

        this.loadExistencias(null,null,null);
        Ext.ComponentManager.get("currentView").mycontroller=this;
    },

    ImprimeInventario: function(button, e, eOpts) {
        var request = {}; request.method="imprimeinventario"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        combo = Ext.ComponentMgr.get("cmbClasificaciones");
        chk = Ext.ComponentMgr.get("chkIdiario");
        request.params.push({"name":"clasificacion","value":combo.getValue()});
        request.params.push({"name":"inventariodiario","value":chk.getValue() ? 1 : 0});
        request.params.push({"name":"claveAlmacen","value":window.claveAlmacen});
        console.log("	Imprime inventareio/" + combo.getValue());
        almacen.getApplication().loadData(request,function(response){});
    },

    loadExistenciaAlmacen: function(button, e, eOpts, claveAlmacen) {
        console.log("Carga de inventarios");
        var request = new Object(); request.method="consultainventario"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});;
        combo = Ext.ComponentMgr.get("cmbClasificaciones");
        chk = Ext.ComponentMgr.get("chkIdiario");
        request.params.push({"name":"clasificacion","value":combo.getValue()});
        request.params.push({"name":"inventariodiario","value":chk.getValue() ? 1 : 0});
        request.params.push({"name":"tipoinventario","value":window.tipoInvenario});
        request.params.push({"name":"claveAlmacen","value":claveAlmacen});
        request.params.push({"name":"proveedormateria","value":Ext.ComponentMgr.get("cmbProveedoresMateria").getValue()});

        var controller = this;

        almacen.getApplication().loadData(request,function(response){
            component = Ext.ComponentMgr.get("gridConsultaClasificaciones");
            component.getStore().loadData(response.items);
            //component.getStore().sort('label','ASC');
            request.method="consultafaltantes";
            almacen.getApplication().loadData(request,function(response){
                if (response.faltantecompras.length > 0 || response.faltanteproducciones.length > 0){
                    //mostrar la ventana de diferencias de inventario
                    var wnd = Ext.create("almacen.view.DlgFaltantesCompras", {id:"wndFaltantesCompras"});
                    //wnd.parentController=currentController;
                    wnd.center();
                    wnd.show();
                    gridCompras = Ext.ComponentMgr.get("gridFaltantesCompras");
                    gridProducciones = Ext.ComponentMgr.get("gridFaltantesProducciones");
                    gridCompras.getStore().loadData(response.faltantecompras);
                    gridCompras.getStore().sort("Concepto", "ASC");
                    gridProducciones.getStore().loadData(response.faltanteproducciones);
                    gridProducciones.getStore().sort("Concepto", "ASC");
                }
            });
            //console.log(component.getStore().getAt(1));
            if (component.getStore().getAt(1).get("Unidad1")=="OCULTA"){
                /*component.columns[5].hide();
                component.columns[7].hide();
                component.columns[8].hide();
                component.columns[10].hide();
                component.columns[11].hide();
                component.columns[12].hide();*/
                component.columns[6].hide();
                component.columns[8].hide();
                component.columns[9].hide();
                component.columns[11].hide();
                component.columns[12].hide();
                component.columns[13].hide();

            }

            if(window.tipoInvenario == 4 && window.claveAlmacenDestino){
                controller.actualizarGrid(window.claveAlmacenDestino);
            }
        });
    },

    actualizarGrid: function(claveAlmacenDestino) {
        if(window.tipoInvenario == 4 && claveAlmacenDestino){
        } else{
            return;
        }
        var request = new Object(); request.method="generainventario"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});;
        request.params.push({"name":"claveAlmacen","value":claveAlmacenDestino});

        combo = Ext.ComponentMgr.get("cmbClasificaciones");
        chk = Ext.ComponentMgr.get("chkIdiario");

        var component = Ext.ComponentMgr.get("gridConsultaClasificaciones");

        component.getStore().each(function(record){
            record.beginEdit();
            record.set("editable", false);
            record.set("Existencia", "");
            record.endEdit();
            record.commit();
            window.AjustesRealizados = {};
        });

        if(window.claveAlmacen == claveAlmacenDestino){
            component.getView().refresh();
            return;
        }

        almacen.getApplication().loadData(request,function(response){
            console.log(response);
            for(var index in response.items){
                var record = response.items[index];
                var editable = record.editable;
                var clave = record.Clave;
                var record1 = component.getStore().findRecord("Clave", clave);
                if(record1){
                    record1.beginEdit();
                    record1.set("editable", true);
                    record1.endEdit();
                    record1.commit();
                }
            }
            component.getView().refresh();
        });
    },

    onGridConsultaClasificacionesBeforeRender: function(component, eOpts) {
        console.log(window.InventariosBeforeEdit);
        // Se definen variables para contralar si se puede editar un registro
        // y que tipo de edicion se realiza.
        // Ver configuacion de tbAjustes, tbMermas y tbSupervision.
        window.InventariosBeforeEdit = function(editor, context, Opts){
            return false;
        };

        window.InventariosAfterEdit = function(editor, context, Opts){
            return false;
        };
        console.log(window.InventariosBeforeEdit);
    },

    onCmbProveedoresMateriaBeforeRender: function(component, eOpts) {
        if(almacen.getApplication().currentSession.manejaproveedormateria){
            component.hidden = false;
        }
    },

    onCmbProveedoresMateriaChange: function(field, newValue, oldValue, eOpts) {

    },

    onCmbSubAlmacenBeforeRender: function(component, eOpts) {
        if(almacen.getApplication().currentSession.subAlmacenes){
            component.hidden = false;
        }
    },

    onCmbSubAlmacenesChange: function(field, newValue, oldValue, eOpts) {
        if(oldValue !== null && newValue != oldValue){
            this.LimpiaGrid(Ext.ComponentMgr.get("gridConsultaClasificaciones"), null);
        }

        window.claveAlmacen = newValue;
    },

    onCmbSubAlmacenBeforeRender1: function(component, eOpts) {
        if(almacen.getApplication().currentSession.subAlmacenes && window.tipoInvenario == 4){
            component.hidden = false;
        }
    },

    onCmbSubAlmacenesChange1: function(field, newValue, oldValue, eOpts) {
        window.claveAlmacenDestino = newValue;
        this.actualizarGrid(newValue);
    }

});
