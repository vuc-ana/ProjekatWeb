using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace  BackEnd.Models
{
    [Table("Sto")]
    public class Sto
    {
        [Column("ID")]
       
        [DataType("int")]
        public int ID { get; set; }

        [Column("N")]
        [DataType("int")]
        public int N { get; set; }

        [Column("M")]
        [DataType("int")]
        public int M{ get; set; }

        [Column("Kapacitet")]
        [DataType("int")]

        public int Kapacitet {get;set;}

        [Column("MaxKapacitet")]
        [DataType("int")]

        public int MaxKapacitet {get;set;}

       [JsonIgnore]
        public Restoran Restoran{get;set;}


    }
    
}