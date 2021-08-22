using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace  BackEnd.Models
{
    [Table("Restoran")]
    public class Restoran
    {

        [Column("ID")]
        [DataType("int")]
        public int ID { get; set; }


        [Column("Naziv")]
        [DataType("nvarchar(255)")]
        public string Naziv { get; set; }

        [Column("X")]
        [DataType("int")]
        public int X { get; set; }

        [Column("Y")]
        [DataType("int")]
        public int Y { get; set; }

        [Column("Kapacitet")]
        [DataType("int")]

        public int Kapacitet {get;set;}

        public virtual List<Sto> Stolovi{get;set;}
        public virtual List<Porudzbina> Porudzbine{get;set;}

    }
    
}