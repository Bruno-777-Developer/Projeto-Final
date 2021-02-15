package br.com.sonner.notas.repository;

import br.com.sonner.notas.models.NotaItem;
import org.springframework.data.jpa.repository.JpaRepository;

// JPA Repository possui vários métodos prontas para fazer persistência no Banco de Dados.
public interface NotaItemRepository extends JpaRepository<NotaItem, Long> {
    NotaItem findById(long id);
}
