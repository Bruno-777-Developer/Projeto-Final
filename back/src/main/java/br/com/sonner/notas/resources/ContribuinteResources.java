package br.com.sonner.notas.resources;

import br.com.sonner.notas.models.Contribuinte;
import br.com.sonner.notas.repository.ContribuinteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Classe API REST e vai receber a requisições http.
@RequestMapping(value = "/cliente") // URI Padrão para a API
public class ContribuinteResources {
    final // para utilizar os métodos para se conectar com o Banco de Dados.
    ContribuinteRepository contribuinteRepository;

    public ContribuinteResources(ContribuinteRepository contribuinteRepository) {
        this.contribuinteRepository = contribuinteRepository;
    }

    @GetMapping("/") // Método que lista todos os contribuintes salvos no Banco de Dados
    public List<Contribuinte> listaContribuintes() {
        return contribuinteRepository.findAll();// Retorno
        //http://localhost:8080/contribuinte/  link da pagina Web.
    }

    @GetMapping("/{id}") // Lista um único contribuinte pelo código do Id = (1, 2, 3 ... )
    public Contribuinte listaContribuinteUnico(@PathVariable(value = "id") long id) {
        return contribuinteRepository.findById(id);// Retorna a pesquisa feita pelo Id.
        //http://localhost:8080/contribuinte/1  link da pagina Web.
    }

    @PostMapping("/") // Recebe um produto para salvar - O Produto vem no corpo da requisição. @RequestBody
    public Contribuinte salvaContribuinte(@RequestBody Contribuinte contribuinte) {
        return contribuinteRepository.save(contribuinte);// Retorna uma nota cadastrada que foi salva
        //http://localhost:8080/contribuinte/
    }

    @PutMapping("/")
    public Contribuinte atualizaContribuinte(@RequestBody Contribuinte contribuinte) {
        return contribuinteRepository.save(contribuinte);// Retorna uma nota cadastrada que foi salva
        //http://localhost:8080/contribuinte/
    }

    @DeleteMapping("/")
    public void deletaContribuinte(@RequestBody Contribuinte contribuinte) {
        contribuinteRepository.delete(contribuinte);
        //http://localhost:8080/contribuinte/
    }

}
