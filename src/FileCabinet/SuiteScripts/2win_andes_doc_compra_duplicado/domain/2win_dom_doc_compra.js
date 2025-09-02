define(['N/record', '../dao/2win_dao_doc_compra'],

    function(record, dao_doc_compra) {

        function existeDocumento(id_tipo, id_proveedor, folio) {
            
            try {

                // Obtener rut proveedor
                var vendorRecord = record.load({ type: record.Type.VENDOR, id: id_proveedor, isDynamic: true });
                var rut_proveedor = vendorRecord.getValue({ fieldId: 'custentity_2wrut' });
                log.audit("existeDocumento - RUT Proveedor", rut_proveedor);

                // Buscar documento afecto o exento
                var facturas_afectas = dao_doc_compra.obtenerFacturaAfecta(id_tipo, rut_proveedor, folio);
                log.audit("existeDocumento - facturas_afectas", facturas_afectas.length);

                if (facturas_afectas.length > 0) {
                    return "Ya existe la <b>Factura Afecta ID " + facturas_afectas[0].id + "</b> con el mismo tipo de documento, RUT proveedor y folio.";
                }

                var facturas_exentas = dao_doc_compra.obtenerFacturaExenta(id_tipo, rut_proveedor, folio);
                log.audit("existeDocumento - facturas_exentas", facturas_exentas.length);

                if (facturas_exentas.length > 0) {
                    return "Ya existe la <b>Factura Exenta ID " + facturas_exentas[0].id + "</b> con el mismo tipo de documento, RUT proveedor y folio.";
                }

                // Buscar boleta de honorario
                var boletas_honorario = dao_doc_compra.obtenerBoletaHonorario(rut_proveedor, folio);
                log.audit("existeDocumento - boletas_honorario", boletas_honorario.length);

                if (boletas_honorario.length > 0) {
                    return "Ya existe la <b>Boleta de Honorario ID " + boletas_honorario[0].id + "</b> con el mismo RUT proveedor y folio.";
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
