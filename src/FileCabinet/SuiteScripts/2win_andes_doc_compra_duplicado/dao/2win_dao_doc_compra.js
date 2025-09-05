define(['N/search', './2win_dao'],

    function (search, dao) {

        function obtenerFacturaAfecta(id_tipo, rut_proveedor, folio) {

            try {

                var tabItem = {
                    type: "vendorbill",
                    settings: [{ "name": "consolidationtype", "value": "NONE" }, { "name": "includeperiodendtransactions", "value": "F" }],
                    filters:
                        [
                            ["type", "anyof", "VendBill"],					/* Tipo Transacci�n */
                            "AND",
                            ["custbody_tipodocumentoelectronico", "anyof", id_tipo],		/* Tipo documento */
                            "AND",
                            ["vendor.custentity_2wrut", "is", rut_proveedor],				/* RUT Proveedor */
                            "AND",
                            ["number", "equalto", folio],					/* Folio documento */
                            "AND",
                            ["formulanumeric: {total} - {netamountnotax}", "notequalto", "0"],	/* Afecto */
                            "AND",
                            ["mainline", "is", "T"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "id" }),
                            search.createColumn({ name: "subsidiarynohierarchy", label: "Empresa" }),
                            search.createColumn({ name: "postingperiod", label: "Mes" }),
                            search.createColumn({ name: "tranid", label: "Num.Doc." }),
                            search.createColumn({ name: "trandate", label: "Fecha" }),
                            search.createColumn({ name: "duedate", label: "Vencimiento" }),
                            search.createColumn({ name: "custentity_2wrut", join: "vendor", label: "RUT" }),
                            search.createColumn({ name: "entityid", join: "vendor", label: "Proveedor" })
                        ]
                }

                return dao.getDataSearch(tabItem);

            } catch (error) {
                log.error({ title: 'obtenerFacturaAfecta - Excepcion', details: error });
                throw error;
            }
        }

        function obtenerFacturaExenta(id_tipo, rut_proveedor, folio) {

            try {

                var tabItem = {
                    type: "vendorbill",
                    settings: [{ "name": "consolidationtype", "value": "NONE" }, { "name": "includeperiodendtransactions", "value": "F" }],
                    filters:
                        [
                            ["type", "anyof", "VendBill"],					/* Tipo Transacci�n */
                            "AND",
                            ["custbody_tipodocumentoelectronico", "anyof", id_tipo],		/* Tipo documento */
                            "AND",
                            ["vendor.custentity_2wrut", "is", rut_proveedor],				/* RUT Proveedor */
                            "AND",
                            ["number", "equalto", folio],					/* Folio documento */
                            "AND",
                            ["formulanumeric: {total} - {netamountnotax}", "equalto", "0"],	/* Exento */
                            "AND",
                            ["mainline", "is", "T"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "id" }),
                            search.createColumn({ name: "subsidiarynohierarchy", label: "Empresa" }),
                            search.createColumn({ name: "postingperiod", label: "Mes" }),
                            search.createColumn({ name: "tranid", label: "Num.Doc." }),
                            search.createColumn({ name: "trandate", label: "Fecha" }),
                            search.createColumn({ name: "duedate", label: "Vencimiento" }),
                            search.createColumn({ name: "custentity_2wrut", join: "vendor", label: "RUT" }),
                            search.createColumn({ name: "entityid", join: "vendor", label: "Proveedor" })
                        ]
                }

                return dao.getDataSearch(tabItem);

            } catch (error) {
                log.error({ title: 'obtenerFacturaExenta - Excepcion', details: error });
                throw error;
            }
        }

        function obtenerBoletaHonorario(rut_prestador, folio) {

            try {

                var tabItem = {
                    type: "vendorbill",
                    settings: [{ "name": "consolidationtype", "value": "NONE" }, { "name": "includeperiodendtransactions", "value": "F" }],
                    filters:
                        [
                            ["type", "anyof", "VendBill"],					/* Tipo Transacci�n */
                            "AND",
                            ["vendor.custentity_2wrut", "is", rut_prestador],				/* RUT Prestador */
                            "AND",
                            ["number", "equalto", folio],					/* Folio boleta */
                            "AND",
                            ["custcol_4601_witaxcode.internalidnumber", "isnotempty", ""],	/* Define si es boleta en lugar de factura */
                            "AND",
                            ["mainline", "is", "T"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "id" }),
                            search.createColumn({ name: "subsidiarynohierarchy", label: "Empresa" }),
                            search.createColumn({ name: "postingperiod", label: "Mes" }),
                            search.createColumn({ name: "trandate", label: "Fecha" }),
                            search.createColumn({ name: "duedate", label: "Vencimiento" }),
                            search.createColumn({ name: "custentity_2wrut", join: "vendor", label: "RUT" }),
                            search.createColumn({ name: "entityid", join: "vendor", label: "Proveedor" })
                        ]
                }

                return dao.getDataSearch(tabItem);

            } catch (error) {
                log.error({ title: 'obtenerBoletaHonorario - Excepcion', details: error });
                throw error;
            }
        }

        function obtenerNotaCredito(id_tipo, rut_proveedor, folio) {

            try {

                var tabItem = {
                    type: "vendorcredit",
                    settings: [{ "name": "consolidationtype", "value": "NONE" }, { "name": "includeperiodendtransactions", "value": "F" }],
                    filters:
                        [
                            ["type", "anyof", "VendCred"],					/* Tipo Transacción */
                            "AND",
                            ["custbody_tipodocumentoelectronico", "anyof", id_tipo],		/* Tipo documento */
                            "AND",
                            ["vendor.custentity_2wrut", "is", rut_proveedor],				/* RUT Proveedor */
                            "AND",
                            ["number", "equalto", folio],					/* Folio documento */
                            "AND",
                            ["mainline", "is", "T"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "id" }),
                            search.createColumn({ name: "subsidiarynohierarchy", label: "Empresa" }),
                            search.createColumn({ name: "postingperiod", label: "Mes" }),
                            search.createColumn({ name: "tranid", label: "Num.Doc." }),
                            search.createColumn({ name: "trandate", label: "Fecha" }),
                            search.createColumn({ name: "duedate", label: "Vencimiento" }),
                            search.createColumn({ name: "custentity_2wrut", join: "vendor", label: "RUT" }),
                            search.createColumn({ name: "entityid", join: "vendor", label: "Proveedor" })
                        ]
                }

                return dao.getDataSearch(tabItem);

            } catch (error) {
                log.error({ title: 'obtenerNotaCredito - Excepcion', details: error });
                throw error;
            }
        }

        return {
            obtenerFacturaAfecta: obtenerFacturaAfecta,
            obtenerFacturaExenta: obtenerFacturaExenta,
            obtenerBoletaHonorario: obtenerBoletaHonorario,
            obtenerNotaCredito: obtenerNotaCredito
        }
    }
);
