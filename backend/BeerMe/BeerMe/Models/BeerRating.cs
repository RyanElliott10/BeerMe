//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BeerMe.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class BeerRating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BeerId { get; set; }
        public double Rating { get; set; }
    
        public virtual User User { get; set; }
        public virtual Beer Beer { get; set; }
    }
}
