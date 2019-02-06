function handleMask(event, mask) {
    with (event) {

        stopPropagation()
        preventDefault()

        if (!charCode) return

        var c = String.fromCharCode(charCode)

        if (c.match(/\D/)) return

            with (target) {
                var val = value.substring(0, selectionStart) + c + value.substr(selectionEnd)
                var pos = selectionStart + 1
            }
    }

    var nan = count(val, /\D/, pos)
    val = val.replace(/\D/g,'')

    var mask = mask.match(/^(\D*)(.+9)(\D*)$/)

    if (!mask) return

    if (val.length > count(mask[2], /9/)) return

    for (var txt='', im=0, iv=0; im<mask[2].length && iv<val.length; im+=1) {
        var c = mask[2].charAt(im)
        txt += c.match(/\D/) ? c : val.charAt(iv++)
    }

    with (event.target) {
        value = mask[1] + txt + mask[3]
        selectionStart = selectionEnd = pos + (pos==1 ? mask[1].length : count(value, /\D/, pos) - nan)
    }

    function count(str, c, e) {
        e = e || str.length

        for (var n=0, i=0; i<e; i+=1) if (str.charAt(i).match(c)) n+=1

        return n
    }
}
/*
$(".cuil_mask").on("keypress", function() {

    //var x = event.which || event.keyCode;

    var x = $(" SELECTOR ").val();

    if(!regex.test(x)){

        $(".errorMsg").html("El cuil ingresado es incorrecto")
    }
    else{
          $(".errorMsg").html("")
    }
})

// Expresión regular para campo de CUIL
var regex = new RegExp(/[2]{1}[0,3,4,7]{1}\-\d{8}\-\d/g);
*/
