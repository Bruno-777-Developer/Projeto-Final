package br.com.sonner.notas.resources;
import br.com.sonner.notas.models.NotaItem;
import br.com.sonner.notas.repository.NotaItemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Classe API REST e vai receber a requisições http.
@RequestMapping(value = "/notaitem") // URI Padrão para a API
public class NotaItemResources {

    final NotaItemRepository notaItemRepository;
    public NotaItemResources(NotaItemRepository notaItemRepository) {
        this.notaItemRepository = notaItemRepository;
    }

    @GetMapping("/") // Método que lista todos os produtos salvos no Banco de Dados
    public List<NotaItem> listaNotaItens() {
        return notaItemRepository.findAll();// Retorna a lista de itens da nota
        //http://localhost:8080/cadastro/notas  link da pagina Web.
    }

    @GetMapping("/{id}") // Lista um único produto pelo código do Id = (1, 2, 3 ... )
    public NotaItem listaNotaItens(@PathVariable(value = "id") long id){
        return notaItemRepository.findById(id);
    }

    /*@GetMapping("/{id}") // Lista um único produto pelo código do Id = (1, 2, 3 ... )
    public NotaItem listaNotaItem(@PathVariable(value = "id") long id){
        return notaItemRepository.findById(id);
    }*/

//    @GetMapping("/itensNota/{id}") // Lista um único produto pelo código do Id = (1, 2, 3 ... )
//    public NotaItem listaNotaItem(@PathVariable(value = "id") long id){
//        return notaItemRepository.findById(id);
//    }

    @PostMapping("/") // Recebe um produto para salvar - O Produto vem no corpo da requisição. @RequestBody
    public NotaItem salvaNotaItem(@RequestBody NotaItem notaitem){
        return notaItemRepository.save(notaitem);
    }

    @PutMapping("/")
    public NotaItem atualizaNotaItem(@RequestBody NotaItem notaItem) {
        return notaItemRepository.save(notaItem);
}

    @DeleteMapping("/")
    public void deletaNotaItem(@RequestBody NotaItem notaitem) {
        notaItemRepository.delete(notaitem);
    }
}
