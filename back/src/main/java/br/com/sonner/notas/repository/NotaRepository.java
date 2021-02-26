package br.com.sonner.notas.repository;

import br.com.sonner.notas.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
// JPA Repository possui vários métodos prontas para fazer persistência no Banco de Dados.
public interface NotaRepository extends JpaRepository<Nota, Long> {
    Nota findById(long id);
}
