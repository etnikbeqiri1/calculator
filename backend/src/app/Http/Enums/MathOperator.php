<?php

namespace App\Http\Enums;

use MyCLabs\Enum\Enum;

/**
 * Class MathOperator
 * @package App\Http\Enums
 *
 * @method static MathOperator PLUS()
 * @method static MathOperator MINUS()
 * @method static MathOperator MULTIPLY()
 * @method static MathOperator DIVIDE()
 */
class MathOperator extends Enum
{
    public const PLUS = "+";
    public const MINUS = "-";
    public const MULTIPLY = "*";
    public const DIVIDE = "/";
    public const EXPONENTIATION = '^';
    public const MODULO = '%';

    public static function getOperators(): array
    {
        return array_values(self::toArray());
    }
}
