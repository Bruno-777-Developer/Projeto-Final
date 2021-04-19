package br.com.sonner.notas.service;

import br.com.sonner.notas.models.Nota;
import br.com.sonner.notas.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    public List<Nota> findAll(){
        return notaRepository.findAll();
    }

}
