package br.com.sonner.notas.resources;

import br.com.sonner.notas.models.Nota;
import br.com.sonner.notas.models.NotaItem;
import br.com.sonner.notas.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.util.List;

@RestController // Classe API REST e vai receber a requisições http.
@RequestMapping(value = "/nota") // URI Padrão para a API
public class NotaResources {
    final // para utilizar os métodos para se conectar com o Banco de Dados.
    NotaRepository notaRepository;

    public NotaResources(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @Autowired
    private Connection connection;

    @GetMapping("/home/")
        public String index() {
        return "index";
        }

    @GetMapping("/conn/")
    public String myConn(Model model) {
        model.addAttribute("conn", connection != null? "Conexão Ok!!":"Ops... Sem Conexão");
        return "index";
    }

    @GetMapping("/") // Método que lista todos os produtos salvos no Banco de Dados
    public List<Nota> listaNotas() {
        return notaRepository.findAll();// Retorno
        //http://localhost:8080/cadastro/notas  link da pagina Web.
    }

    @GetMapping("/{id}") // Lista um único produto pelo código do Id = (1, 2, 3 ... )
    public Nota listaNota(@PathVariable(value = "id") long id) {
        Nota nota = notaRepository.findById(id); // pesquisa feita pelo Id.
        return nota;// Retorna a nota
    }

    @PostMapping("/") // Recebe um produto para salvar - O Produto vem no corpo da requisição. @RequestBody
    public Nota salvaNota(@RequestBody Nota cadastronota) {
        return notaRepository.save(cadastronota);// Retorna uma nota cadastrada que foi salva
    }

    @PutMapping("/")
    public Nota atualizaNota(@RequestBody Nota nota) {
        for (NotaItem item : nota.getItens()) {
            item.setNota( nota );
        }
        nota = notaRepository.save(nota);
        return nota;
    }

    @DeleteMapping("/")
    public void deletaNota(@RequestBody Nota nota) {
        notaRepository.delete(nota);
    }

}

