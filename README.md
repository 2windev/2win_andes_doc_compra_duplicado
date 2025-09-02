# 2win_andes_doc_compra_duplicado

- Requisitos previos a la instalación

    1. Bundle 2win_facturacion_modulo_modelo (536988)

- Requisitos posteriores a la instalación

    No hay
    
- Funcionalidades

    1. [2Win CS Valida Duplicado Doc. Compra](src/FileCabinet/SuiteScripts/2win_andes_doc_compra_duplicado/2win_cs_valida_duplicado_doc_compra.js): Script Cliente que se utiliza para validar documentos en el evento saveRecord de la transacción.

- Tablas y Campos

    1. transaction (VendorBill y VendorCredit)
        - custbody_tipodocumentoelectronico

    2. vendor
        - custentity_2wrut