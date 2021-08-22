using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace  BackEnd.Models
{
     [Table("Porudzbina")]
    public class Porudzbina
    {
        [Column("ID")]
        [DataType("int")]
        public int ID { get; set; }

        [Column("RedniBroj")]
        [DataType("int")]
        public int RedniBroj { get; set; }

        [Column("Cena")]
        [DataType("int")]
        public int Cena{get;set;}

         [Column("X")]
        [DataType("int")]
        public int X { get; set; }

        [Column("Y")]
        [DataType("int")]
        public int Y { get; set; }

        [Column("Tip")]
        [DataType("nvarchar(255)")]
        public string Tip { get; set; }

        [JsonIgnore]
        public Restoran Restoran{get;set;}


    }
    
}