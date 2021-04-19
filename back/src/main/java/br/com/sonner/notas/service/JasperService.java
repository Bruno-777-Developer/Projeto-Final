package br.com.sonner.notas.service;

import br.com.sonner.notas.models.Nota;
import br.com.sonner.notas.repository.NotaRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class JasperService {

    private static final String JASPER_DIRETÓRIO = "jasper/";
//    private static final String JASPER_DIRETÓRIO = "classpath:jasper/";
    private static final String JASPER_PREFIXO = "notas-";
    private static final String JASPER_SUFIXO = ".jasper";


    private Connection connection;

    @Autowired
    NotaRepository notaRepository;

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

    public byte[] exportarPDF2(String code){
        byte[] bytes = null;
        List<Nota> notas = notaRepository.findAll();
        JRDataSource dataSource = new JRBeanCollectionDataSource(notas);

        try {
            Resource resource = new ClassPathResource(JASPER_DIRETÓRIO.concat(JASPER_PREFIXO).concat(code).concat(JASPER_SUFIXO));
//            File file = ResourceUtils.getFile(JASPER_DIRETÓRIO.concat(JASPER_PREFIXO).concat(code).concat(JASPER_SUFIXO));
            JasperPrint print = JasperFillManager.fillReport(resource.getFile().getAbsolutePath(), params, dataSource);
            bytes = JasperExportManager.exportReportToPdf(print);
        } catch (FileNotFoundException | JRException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;

    }

}
