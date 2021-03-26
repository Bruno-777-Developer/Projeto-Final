package br.com.sonner.notas.service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@Service
public class JasperService {

    private static final String JASPER_DIRETÓRIO = "classpath:jasper/";
    private static final String JASPER_PREFIXO = "notas-";
    private static final String JASPER_SUFIXO = ".jasper";
    @Autowired
    private Connection connection;

    Map<String, Object> params = new HashMap<>();

    public JasperService() {
        this.params.put("IMAGEM_DIRETORIO", JASPER_DIRETÓRIO);
    }

    public void addParams(String key, Object value) {
        this.params.put(key, value);
    }

    public byte[] exportarPDF(String code) {
        byte[] bytes = null;
        try {
            File file = ResourceUtils.getFile(JASPER_DIRETÓRIO.concat(JASPER_PREFIXO).concat(code).concat(JASPER_SUFIXO));
            JasperPrint print = JasperFillManager.fillReport(file.getAbsolutePath(), params, connection);
            bytes = JasperExportManager.exportReportToPdf(print);
        } catch (FileNotFoundException | JRException e) {
            e.printStackTrace();
        }
        return bytes;
    }

}