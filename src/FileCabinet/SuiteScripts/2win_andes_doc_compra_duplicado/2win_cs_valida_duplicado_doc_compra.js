/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/ui/dialog', './domain/2win_dom_doc_compra'],

    function(dialog, dom_doc_compra) {

        function pageInit(context) {

        }

        function saveRecord(context) {

            log.debug("saveRecord - context", context);

            var currentRecord = context.currentRecord;
            var tipo = currentRecord.type;
            var tipo_documento = currentRecord.getValue({ fieldId: 'custbody_tipodocumentoelectronico' });
            var id_proveedor = currentRecord.getValue({ fieldId: 'entity' });
            var folio = currentRecord.getValue({ fieldId: 'tranid' });
            
            log.debug("saveRecord - Type", tipo);
            log.debug("saveRecord - Tipo documento", tipo_documento);
            log.debug("saveRecord - ID Proveedor", id_proveedor);
            log.debug("saveRecord - Folio", folio);

            if (tipo_documento == null || tipo_documento == '' || id_proveedor == null || id_proveedor == '' || folio == null || folio == '') {
                log.debug("saveRecord - Campos requeridos necesarios", "No se puede validar documento duplicado, faltan campos requeridos (tipo documento, proveedor o folio)");
                return true;
            }

            // Validar si ya existe documento con mismo tipo, rut proveedor y folio
            var mensaje = dom_doc_compra.existeDocumento(tipo, tipo_documento, id_proveedor, folio);
            log.debug("saveRecord - Mensaje validación", mensaje);

            if (mensaje != null) {
                dialog.alert({ title: 'Atención', message: mensaje });
                return false;
            }

            return true;
        }

        return {
            pageInit: pageInit,
            saveRecord: saveRecord
        }
    }
);
