<?php

namespace App\Http\Services;

use App\Http\Enums\MathOperator;
use InvalidArgumentException;
use SplStack;
class CalculationService
{
    public function evaluateExpression(string $expression): float {
        $tokens = $this->tokenize($expression);
        $postfixTokens = $this->toPostfix($tokens);
        return $this->evaluatePostfix($postfixTokens);
    }

    private function tokenize(string $expression): array {
        return preg_split('# *([+\-*/^()%]) *#', $expression, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
    }

    private function toPostfix(array $tokens): array {
        $output = [];
        $stack = new SplStack();
        $operators = MathOperator::getOperators();

        foreach ($tokens as $token) {
            if (is_numeric($token)) {
                $output[] = $token;
            } elseif (in_array($token, $operators)) {
                while (!$stack->isEmpty() && $stack->top() != '(' && $this->hasHigherPrecedence($stack->top(), $token)) {
                    $output[] = $stack->pop();
                }
                $stack->push($token);
            } elseif ($token == '(') {
                $stack->push($token);
            } elseif ($token == ')') {
                while (!$stack->isEmpty() && $stack->top() != '(') {
                    $output[] = $stack->pop();
                }
                $stack->pop();
            }
        }
        while (!$stack->isEmpty()) {
            $output[] = $stack->pop();
        }

        return $output;
    }

    private function evaluatePostfix(array $postfixTokens): float {
        $evalStack = new SplStack();
        foreach ($postfixTokens as $token) {
            if (is_numeric($token)) {
                $evalStack->push($token);
            } else {
                $b = $evalStack->pop();
                $a = $evalStack->pop();
                $result = $this->evaluateOperation($a, $b, $token);
                $evalStack->push($result);
            }
        }
        return $evalStack->pop();
    }

    private function hasHigherPrecedence(string $operator1, string $operator2): bool {
        return $this->getPrecedence($operator1) >= $this->getPrecedence($operator2);
    }

    private function getPrecedence(string $operator): int {
        switch ($operator) {
            case MathOperator::PLUS:
            case MathOperator::MINUS:
                return 1;
            case MathOperator::MULTIPLY:
            case MathOperator::DIVIDE:
            case MathOperator::MODULO:
                return 2;
            case MathOperator::EXPONENTIATION:
                return 3;
            default:
                return 0;
        }
    }

    private function evaluateOperation(float $a, float $b, string $operator): float {
        switch ($operator) {
            case MathOperator::PLUS:
                return $a + $b;
            case MathOperator::MINUS:
                return $a - $b;
            case MathOperator::MULTIPLY:
                return $a * $b;
            case MathOperator::DIVIDE:
                return $a / $b;
            case MathOperator::EXPONENTIATION:
                return pow($a, $b);
            case MathOperator::MODULO:
                return $a % $b;
            default:
                throw new InvalidArgumentException("Invalid operator: $operator");
        }
    }
}
