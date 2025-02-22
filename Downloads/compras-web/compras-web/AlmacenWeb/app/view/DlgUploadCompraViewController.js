/*
 * File: app/view/DlgUploadCompraViewController.js
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

Ext.define('almacen.view.DlgUploadCompraViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dlguploadcompra',

    control: {
        "button#btnUploadCompra": {
            click: 'SubirCompra'
        }
    },

    SubirCompra: function(button, e, eOpts) {
            this.ProcesaCompraXML(null);
    },

    MuestraDialogoAsociar: function(recProducto) {
            //if(!recProducto.get("xmlModificaProporcion")) return false;
            var wnd = Ext.create("almacen.view.DlgAsociarProducto", {id:"wndAsociaProducto"});
                wnd.currentRecord=recProducto;
                wnd.currentController=this;
                wnd.center();
                wnd.show();
                Ext.ComponentMgr.get("fldProporcion").setValue(recProducto.get("xmlProporcionExterna"));

    },

    actualizaIVA: function() {
        console.log("------------------------------");
        console.log("------- actualiza IVA --------");
        console.log("------------------------------");
        IvaAsignar=window.currentXxml.xmlIVAAsignar;
        IEPSAsignar=window.currentXxml.xmlIEPSAsignar;

        var IEAsignar=window.currentXxml.xmlIEAsignar;
        console.log("IEAsignar = " + IEAsignar);

        var porcentajeIE=0.0;

        Procesados = {};
        Procesados1 = {};
        TotalProductosAsignar=0;
        Ext.ComponentMgr.get("gridXml").getStore().each(function(rec){
            console.log("-------------- Producto ----------->");
            if(rec.modified && rec.modified.Impuesto){
                var ImpuestoRec = parseFloat(rec.get("Impuesto"));
                var ImpuestoModified = parseFloat(rec.modified.Impuesto);
                if(ImpuestoRec != ImpuestoModified){
                    rec.set("ImpuestoAnterior", ImpuestoModified);
                }
            }
            ImpuestoTotal=0;
            IEPS = almacen.getApplication().calculaIEPS(rec.get("tasa"), rec.get("cantidad"), rec.get("costoUnitario"),rec.get("Descuento"),rec.get("Impuesto"));
            console.log("IEPS = " + IEPS);
            porcentajeIE=rec.get("ie");
            if ((rec.get("xmlProporcionExterna")<=0)) TotalProductosAsignar++;
            TasaIVA = parseFloat(rec.get("Impuesto"));
            if(TasaIVA > 0 ){
                rec.set("tieneImpuesto", true);
            } else {
                rec.set("tieneImpuesto", false);
            }
            Precio=rec.get("importe");
            var IECalculado=(Precio) * (porcentajeIE/100);
            IEAsignar -= IECalculado;
            console.log("IECalculado = " + IECalculado);
            console.log("IEAsignar = " + IEAsignar);
            if (rec.get("tieneImpuesto") && !Procesados[rec.get("xmlNoIdentificacion") + rec.get("claveBarra")] ){
                Procesados[rec.get("xmlNoIdentificacion") + rec.get("claveBarra")]=true;
                Impuesto = 0;
                PrecioTotal=rec.get("importe");
                TasaIVA = parseFloat(rec.get("Impuesto"));
                Impuesto = (PrecioTotal+IEPS+IECalculado) * (TasaIVA/100);
                ImpuestoTotal+=Impuesto;
                IvaAsignar -= Impuesto;
                console.log("Impuesto = " + Impuesto);
            }
            if (IEPS > 0 && !Procesados1[rec.get("xmlNoIdentificacion") + rec.get("claveBarra")]){
                Procesados1[rec.get("xmlNoIdentificacion") + rec.get("claveBarra")]=true;
                IEPSAsignar -= IEPS;
                console.log("IepsAsignar = " + IEPSAsignar);
            }
        });

        Ext.ComponentMgr.get("fldIVA").setValue(IvaAsignar);
        Ext.ComponentMgr.get("fldPRODS").setValue(TotalProductosAsignar);

        if (TotalProductosAsignar>0)
            Ext.ComponentMgr.get("fldPRODS").setFieldStyle("color: red;");
        else
            Ext.ComponentMgr.get("fldPRODS").setFieldStyle("color: green;");



        if ((IvaAsignar >= 1) || (IvaAsignar <= -1))
            Ext.ComponentMgr.get("fldIVA").setFieldStyle("color: red;");
        else
            Ext.ComponentMgr.get("fldIVA").setFieldStyle("color: green;");

        Ext.ComponentMgr.get("fldIEPS").setValue(IEPSAsignar);
        if ((IEPSAsignar >= 1) || (IEPSAsignar <= -1))
            Ext.ComponentMgr.get("fldIEPS").setFieldStyle("color: red;");
        else
            Ext.ComponentMgr.get("fldIEPS").setFieldStyle("color: green;");

        Ext.ComponentMgr.get("fldIE").setValue(IEAsignar);
        if ((IEAsignar >= 1) || (IEAsignar <= -1))
            Ext.ComponentMgr.get("fldIE").setFieldStyle("color: red;");
        else
            Ext.ComponentMgr.get("fldIE").setFieldStyle("color: green;");
    },

    ProcesaCompraXML: function(compraXML) {
        currentController=this;

        // carga IVA
        cmbStoreiva = Ext.StoreManager.get("StoreComboImpuestos");

        var request = new Object(); request.method="impuestos"; request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        almacen.getApplication().loadData(request,function(response){
            console.log("response");
            console.log(response);
            cmbStoreiva.removeAll();
            cmbStoreiva.loadData(response.items);


            cmbStore = Ext.StoreManager.get("StoreTasasIEPS");


            var request = new Object(); request.method="listaieps"; request.params=[];
            request.params.push({"name":"imei","value":almacen.getApplication().SessionId});

            almacen.getApplication().loadData(request,function(response){
                console.log("response");
                console.log(response);
                cmbStore.removeAll();
                cmbStore.loadData(response);
                Ext.getStore("StoreComboProductos").removeAll();
                var request = new Object();
                request.method="productoscompra";
                request.params=[];
                request.params.push({"name":"imei","value":almacen.getApplication().SessionId},
                                    {"name":"clasificacion","value":""});

                almacen.getApplication().loadData(request,function(response){
                    console.log("response productoscompra");
                    console.log(response);
                    Ext.getStore("StoreComboProductos").loadData(response.productos);
                    Ext.getStore("StoreComboProductos").sort('nombreproducto','ASC');
                    //Ext.ComponentMgr.get("comboProducto").getPicker().loadMask.hide();

                });
                window.currentXxml=null;
                window.currentCompraXML = null;
                console.log('URL');

                console.log(almacen.getApplication().Url);
                Ext.ComponentMgr.get("gridXml").mask("Cargando CFDI, espere por favor...");
                Ext.ComponentMgr.get("gridXml").getStore().removeAll();
                console.log('Se empézara a subir');
                var iUploadCompra = '1';
                //if (document.getElementById("compraXML"))
                //   document.getElementById("compraXML").value=null;
                var oParams  = {};


                if (compraXML){
                    var rCompra = Ext.encode(compraXML);
                    //if (!document.getElementById("compraXML"))
                    //    Ext.ComponentMgr.get("frmUpload").getForm().getEl().createChild({tag:'input',type:'hidden',name:'compraXML',id:'compraXML'});

                    iUploadCompra = '2';
                    window.currentCompraXML = compraXML;
                    oParams["compraXML"] = rCompra;
                    var oLblCompra = "UUID: " + compraXML.UUID_CFDI + " PROV: " + compraXML.NOMBRE_PROVEEDOR;
                    Ext.ComponentMgr.get("lblCFDISeleccionado").setText(oLblCompra);
                }
                oParams["uploadcompra"] =iUploadCompra;

                Ext.ComponentMgr.get("frmUpload").getForm().submit({
                    clientValidation: true,
                    url: almacen.getApplication().Url,
                    params:oParams,
                    success: function(form, action) {
                        console.log(action.result);
                        if (action.result.compraXML){
                            window.currentCompraXML =  action.result.compraXML;
                            var oLblCompra1 = "UUID: " + window.currentCompraXML.UUID_CFDI + " PROV: " + window.currentCompraXML.NOMBRE_PROVEEDOR;
                            Ext.ComponentMgr.get("lblCFDISeleccionado").setText(oLblCompra1);
                        }


                        window.currentXxml=action.result;
                        Ext.ComponentMgr.get("fldIE").setValue(action.result.xmlIEAsignar);
                        Ext.ComponentMgr.get("fldIE").setFieldStyle(action.result.xmlIEAsignar > 0 ?"color: red;" : "color: green;");
                        Ext.ComponentMgr.get("fldIVA").setValue(action.result.xmlIVAAsignar);
                        Ext.ComponentMgr.get("fldIVA").setFieldStyle(action.result.xmlIVAAsignar > 0 ?"color: red;" : "color: green;");
                        Ext.ComponentMgr.get("fldIEPS").setValue(action.result.xmlIEPSAsignar);
                        Ext.ComponentMgr.get("fldIEPS").setFieldStyle(action.result.xmlIEPSAsignar > 0 ?"color: red;" : "color: green;");
                        Ext.ComponentMgr.get("fldRetencion").setValue(action.result.xmlRetencionAsignar);
                        Ext.ComponentMgr.get("fldRetencion").setFieldStyle(action.result.xmlRetencionAsignar > 0 ?"color: black;" : "color: black;");
                        Ext.ComponentMgr.get("gridXml").getStore().loadData(action.result.productosCompraAgregar);
                        Ext.ComponentMgr.get("gridXml").unmask();
                        currentController.actualizaIVA();

                    },
                    failure: function(form, action) {
                        Ext.ComponentMgr.get("gridXml").unmask();
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Failure1', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure2', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.msg);
                                break;
                            default:
                                Ext.Msg.alert('Failure', action.result.msg);
                                break;

                        }
                    }
                });
            });

        });
    },

    onRadiogroupChange: function(field, newValue, oldValue, eOpts) {
        console.log(newValue);
        window.currentCompraXML=null;
        Ext.ComponentMgr.get("gridXml").getStore().removeAll();
        window.currentCompraXML=null;
        if (newValue["rb"])
        valor=newValue["rb"];

        if (valor=="1"){ //Habilitar Buscar correo
            Ext.ComponentMgr.get("btnCheckInbox").setDisabled(false);
            Ext.ComponentMgr.get("fileCompra").setDisabled(true);
            Ext.ComponentMgr.get("btnUploadCompra").setDisabled(true);
            Ext.ComponentMgr.get("lblCFDISeleccionado").setText("");

        }else if (valor=="2"){ //Habilitar Carga Local
            Ext.ComponentMgr.get("btnCheckInbox").setDisabled(true);
            Ext.ComponentMgr.get("fileCompra").setDisabled(false);
            Ext.ComponentMgr.get("btnUploadCompra").setDisabled(false);
            Ext.ComponentMgr.get("lblCFDISeleccionado").setText("");
        }
    },

    onBtnCheckInboxClick: function(button, e, eOpts) {
        var wnd = Ext.create("almacen.view.DlgConsultaCompraXML", {id:"wndConsultaComprasXML"});
        wnd.currentController=this;
        wnd.center();
        wnd.show();
    },

    onCmbIEBeforeRender: function(component, eOpts) {
        var activar=almacen.getApplication().currentSession.habilitaImpuestoIE;

        if(activar){
            Ext.ComponentMgr.get("columnaie").show();
        }else{
            Ext.ComponentMgr.get("columnaie").hide();
        }
    },

    onCmbIEBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.query = new RegExp(queryPlan.query, 'i');
        queryPlan.forceAll = true;
    },

    onViewItemUpdate: function(record, index, node, eOpts) {
        /*IvaAsignar=window.currentXxml.xmlIVAAsignar;
        Procesados = {};
        Ext.ComponentMgr.get("gridXml").getStore().each(function(rec){

        ImpuestoTotal=0;
        console.log("procesados");
        console.log(Procesados);
        console.log("ident");
        console.log(rec.get("xmlNoIdentificacion"));
        if (rec.get("tieneImpuesto") && !Procesados[rec.get("xmlNoIdentificacion")]){
        Procesados[rec.get("xmlNoIdentificacion")]=true;
        Impuesto = 0;
        PrecioTotal=rec.get("importe");
        Impuesto = PrecioTotal * .16;
        ImpuestoTotal+=Impuesto;
        IvaAsignar -= Impuesto;
        }
        });

        Ext.ComponentMgr.get("fldIVA").setValue(IvaAsignar);
        if ((IvaAsignar > 0.01) || (IvaAsignar < 0))
        Ext.ComponentMgr.get("fldIVA").setFieldStyle("color: red;");
        else
        Ext.ComponentMgr.get("fldIVA").setFieldStyle("color: green;");*/
        this.actualizaIVA();

    },

    onViewItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.MuestraDialogoAsociar(record);
    },

    onFldIEAfterRender: function(component, eOpts) {
        var activar=almacen.getApplication().currentSession.habilitaImpuestoIE;

        if(activar){
            Ext.ComponentMgr.get("fldIE").show();
        }else{
            Ext.ComponentMgr.get("fldIE").hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        if (Ext.ComponentMgr.get("gridXml").getSelection().length <= 0) return false;
        this.MuestraDialogoAsociar(Ext.ComponentMgr.get("gridXml").getSelection()[0]);
    },

    onBtnImportClick: function(button, e, eOpts) {
        IvaAsignar=Ext.ComponentMgr.get("fldIVA").getValue();
        IEPSAsignar=Ext.ComponentMgr.get("fldIEPS").getValue();
        PRODAsignar=Ext.ComponentMgr.get("fldPRODS").getValue();
        IEAsignar=Ext.ComponentMgr.get("fldIE").getValue();
        MsgError="";
        if (PRODAsignar > 0) MsgError+="<li>Faltan productos por asignar, complete la asociación de los productos </li>";
        if (((IEPSAsignar >= 1) || (IEPSAsignar <= -1))) MsgError+="<li>La diferencia de IEPS debe ser menor a 1MXN, verifique asignación de tasa </li>";
        if (((IvaAsignar >= 1) || (IvaAsignar <= -1))) MsgError+="<li>La diferencia de IVA debe ser menor a 1MXN, verifique asignación de IVA </li>";
        if (((IEAsignar >= 1) || (IEAsignar <= -1))) MsgError+="<li>La diferencia de IE debe ser menor a 1MXN, verifique asignación de IE </li>";
        if (MsgError > " "){
            Ext.Msg.alert('Verifique la información', "<ul>"+MsgError + "</ul>");
            return false;
        }
        window.currentXxml.productosCompraAgregar=[];
        Ext.ComponentMgr.get("gridXml").getStore().each(function(rec){
            window.currentXxml.productosCompraAgregar.push(rec.data);

        });
        var currentController =  Ext.WindowManager.get("wndUploadCompra").parentController;
        var request = new Object();
        request.method="importacompracomprobante";
        request.params=[];
        request.params.push({"name":"imei","value":almacen.getApplication().SessionId});
        request.params.push({"name":"data","value":Ext.encode(window.currentXxml)});
        var controller = this;
        almacen.getApplication().loadData(request,function(response){

            //currentController.loadConsultaTraspasos(null,null);
            if (Ext.WindowManager.get("wndUploadCompra"))
            Ext.WindowManager.get("wndUploadCompra").close();

            console.log("el response ");
            console.log(response);
            console.log("currentCompraXML ", window.currentCompraXML);

            if (window.currentCompraXML)
            currentController.ImportaCompra(response, window.currentCompraXML);
            else
            currentController.ImportaCompra(response);

            currentController.readOnly=false;

            //Ext.ComponentMgr.get("comboProveedor").getPicker().loadMask.hide();
            console.log("despues de enviar");
        });
    },

    onGridXmlShow: function(component, eOpts) {
        component.getStore().removeAll();
    },

    onCellEditingEdit: function(editor, context, eOpts) {

    }

});
