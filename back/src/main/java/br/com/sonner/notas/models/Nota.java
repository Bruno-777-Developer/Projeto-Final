package br.com.sonner.notas.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "nota")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Nota implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne // Relação de Muito para Um.
    @JoinColumn(name = "contribuinte") // Nome da tabela relacionada
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Contribuinte contribuinte; // Classe e o Objeto sempre próximos da Anotação

    private long numero;

    private String descricao;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date data;

    @OneToMany(mappedBy="nota", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonIgnore
	private List<NotaItem> itens; // Relação de Um para Muitos. Mapeado a partir da Tabela Nota
    // Em Cascata. Buscar do Tipo Preguiçoso.


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Contribuinte getContribuinte() {
        return this.contribuinte;
    }

    public void setContribuinte(Contribuinte contribuinte) {
        this.contribuinte = contribuinte;
    }

    public long getNumero() {
        return numero;
    }

    public void setNumero(long numero) {
        this.numero = numero;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public List<NotaItem> getItens() {
        return itens;
    }

    public void setItens(List<NotaItem> itens) {
        this.itens = itens;
    }
}
