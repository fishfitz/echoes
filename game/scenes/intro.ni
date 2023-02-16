#start
Bienvenue au jeu des dés d'audace.
Ne vous inquiétez pas, vous ne jouez pas contre l'Audacieux.
Exceptionnellement, pas de mise, les parties sont offertes!
>>audace_debut

#audace_debut
Vous êtes suiveur.
L'autre joueur lance les dés pour déterminer la limite.
$ AUDACE_DE_1 = RANDOM(1,6)
$ AUDACE_DE_2 = RANDOM(1,6)
$ AUDACE_LIMITE = (AUDACE_DE_1 + AUDACE_DE_2) * 3
Ils donnent {{ AUDACE_DE_1 }} et {{ AUDACE_DE_2 }}, ce qui multiplié par trois donne {{ AUDACE_LIMITE }}.
$ AUDACE_PNJ_SCORE = 0
>>audace_pnj

#audace_pnj
L'autre joueur lance les dés.
$ AUDACE_DE_1 = RANDOM(1,6)
$ AUDACE_DE_2 = RANDOM(1,6)
$ AUDACE_PNJ_SCORE += AUDACE_DE_1 + AUDACE_DE_2
Ils donnent {{ AUDACE_DE_1 }} et {{ AUDACE_DE_2 }}. Son nouveau score est {{ AUDACE_PNJ_SCORE }}.
? AUDACE_PNJ_SCORE > AUDACE_LIMITE ? >>audace_pnj_depassement
? AUDACE_PNJ_SCORE + RANDOM(3, 7) > AUDACE_LIMITE ? >>audace_pnj_stop
Il décide de continuer à jouer.
>>audace_pnj

#audace_pnj_depassement
L'autre joueur a dépassé le score...
>>audace_victoire

#audace_pnj_stop
Il décide de s'arrêter. C'est à vous.
$ AUDACE_SCORE = 0
>>audace_jet

#audace_choix
Votre score actuel {{ AUDACE_SCORE }}, et la limite est {{ AUDACE_LIMITE }}. L'autre joueur a fait {{ AUDACE_PNJ_SCORE }}.
>>audace_jet Jeter les dés. >>audace_stop Arrêter là.

#audace_jet
Vous lancez deux dés.
$ AUDACE_DE_1 = RANDOM(1,6)
$ AUDACE_DE_2 = RANDOM(1,6)
$ AUDACE_SCORE += AUDACE_DE_1 + AUDACE_DE_2
Ils donnent {{ AUDACE_DE_1 }} et {{ AUDACE_DE_2 }}. Votre nouveau score est {{ AUDACE_SCORE }}.
? AUDACE_SCORE > AUDACE_LIMITE ? >>audace_defaite
? AUDACE_SCORE > AUDACE_PNJ_SCORE ? >>audace_victoire
? AUDACE_SCORE == AUDACE_LIMITE ? >>audace_egalite
>>audace_choix

#audace_defaite
Dommage, vous avez perdu.
Mais vous pouvez toujours rejouer.
>>audace_debut

#audace_victoire
Bravo, vous avez gagné.
Vous pouvez rejouer si vous le souhaitez !
>>audace_debut

#audace_egalite
C'est une égalité.
Vous pouvez rejouer pour vous départager.
>>audace_debut
