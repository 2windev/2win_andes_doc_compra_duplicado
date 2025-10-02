define(['N/record', '../dao/2win_dao_doc_compra'],

    function(record, dao_doc_compra) {

        function existeDocumento(tipo, id_tipo, id_proveedor, folio, id_interno) {
            
            try {

                // Obtener rut proveedor
                var vendorRecord = record.load({ type: record.Type.VENDOR, id: id_proveedor, isDynamic: true });
                var rut_proveedor = vendorRecord.getValue({ fieldId: 'custentity_2wrut' });
                log.audit("existeDocumento - RUT Proveedor", rut_proveedor);

                if (tipo === "vendorcredit") {

                    // Buscar nota de crédito
                    var notas_credito = dao_doc_compra.obtenerNotaCredito(id_tipo, rut_proveedor, folio, id_interno);
                    log.audit("existeDocumento - notas_credito", notas_credito.length);

                    if (notas_credito.length > 0) {
                        return "Ya existe la <b>Nota de Crédito Folio " + folio + "</b> con el mismo tipo de documento y RUT proveedor.";
                    }

                } else {

                    // Buscar documento afecto o exento
                    var facturas_afectas = dao_doc_compra.obtenerFacturaAfecta(id_tipo, rut_proveedor, folio, id_interno);
                    log.audit("existeDocumento - facturas_afectas", facturas_afectas.length);
    
                    if (facturas_afectas.length > 0) {
                        return "Ya existe la <b>Factura Afecta Folio " + folio + "</b> con el mismo tipo de documento y RUT proveedor.";
                    }
    
                    var facturas_exentas = dao_doc_compra.obtenerFacturaExenta(id_tipo, rut_proveedor, folio, id_interno);
                    log.audit("existeDocumento - facturas_exentas", facturas_exentas.length);
    
                    if (facturas_exentas.length > 0) {
                        return "Ya existe la <b>Factura Exenta Folio " + folio + "</b> con el mismo tipo de documento y RUT proveedor.";
                    }
    
                    // Buscar boleta de honorario
                    var boletas_honorario = dao_doc_compra.obtenerBoletaHonorario(rut_proveedor, folio, id_interno);
                    log.audit("existeDocumento - boletas_honorario", boletas_honorario.length);
    
                    if (boletas_honorario.length > 0) {
                        return "Ya existe la <b>Boleta de Honorario Folio " + folio + "</b> con el mismo RUT proveedor.";
                    }
                }

                return null;

            } catch (error) {
                throw error;
            }
        }

        return {
            existeDocumento: existeDocumento
        }
    }
);
