package br.com.sonner.notas.repository;
import br.com.sonner.notas.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// JPA Repository possui vários métodos prontas para fazer persistência no Banco de Dados.
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Produto findById(long Id);
}
