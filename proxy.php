<?php 

if (isset($_GET['url'])) 
{      
    $handle = fopen($_GET['url'], "r"); 
    if ($handle) 
    { 
        while (!feof($handle)) 
        { 
            $buffer = fgets($handle, 4096); 
            echo $buffer; 
        } 
         
        fclose($handle); 
    } 
} 

?>
